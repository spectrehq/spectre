import "dotenv/config"
import type { ProgramManager } from "@aleohq/sdk"
import {
  importAleo,
  programAddress,
  delegatorProgram,
  STCREDITS_CACHE_BATCH_NUM,
  STCREDITS_PROGRAM,
  CacheStateEnum,
  StCreditsProgram as StCreditsProgramBase,
  u32Str,
  u64Str,
  BondState
} from "spectre"
import config from "../config.json"

export async function run() {
  const aleo = await importAleo()

  const { Account, AleoKeyProvider, NetworkRecordProvider, ProgramManager } = aleo

  const account = new Account({
    privateKey: process.env.PRIVATE_KEY
  })

  const programManager = new ProgramManager()
  programManager.networkClient.host = "https://api.explorer.aleo.org/v1/testnet"
  programManager.setAccount(account)

  const keyProvider = new AleoKeyProvider()
  keyProvider.useCache(true)
  const recordProvider = new NetworkRecordProvider(account, programManager.networkClient)
  programManager.keyProvider = keyProvider
  programManager.recordProvider = recordProvider

  const period = 5 * 60 * 1000 // 5min
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const startAt = Date.now()

    await operate(programManager)

    const elapsed = Date.now() - startAt
    await delay(Math.min(elapsed > period ? 0 : period - elapsed, 10 * 1000))
  }
}

async function operate(programManager: ProgramManager) {
  const stcreditsProgram = new StCreditsProgram(programManager)

  const cfg = await stcreditsProgram.getConfig()

  if (!cfg || !cfg.initialized) {
    console.log("stcredits program is not initialized")
    return
  }
  if (cfg.paused) {
    console.log("stcredits program is paused")
    return
  }

  await stcreditsProgram.claimUnbond()
  await stcreditsProgram.resolveWithdraw()
  await stcreditsProgram.cache()
  // unbond/bond can only be called after cache is finished successfully
  await stcreditsProgram.unbond()
  await stcreditsProgram.bond()
}

class StCreditsProgram extends StCreditsProgramBase {
  constructor(private programManager: ProgramManager) {
    super(
      async (mapping, key) =>
        (await programManager.networkClient.getProgramMappingValue(STCREDITS_PROGRAM, mapping, key)) as string
    )
  }

  async bond() {
    const totalBuffered = await this.getTotalBuffered()
    const totalWithdraw = await this.getTotalWithdraw()
    const totalPendingWithdraw = await this.getTotalPendingWithdraw()
    const amount = totalBuffered - totalWithdraw - totalPendingWithdraw

    if (amount < BigInt(1e6)) {
      console.log(`no enough buffered amount to bond: ${amount}`)
      return
    }

    const delegatorBonded = await this.getDelegatorBonded()

    let minBonded = BigInt(Number.MAX_SAFE_INTEGER)
    let selected:
      | {
      delegatorProgram: string
      validatorIndex: bigint
      validator: string
    }
      | undefined
    for (let { delegator, delegatorProgramName, validatorIndex, validator, bonded } of delegatorBonded) {
      if (!bonded) {
        if (amount < BigInt(1e4 * 1e6)) {
          // must bond at least 10k for a delegator for first time
          continue
        }
        minBonded = 0n
        selected = {
          delegatorProgram: delegatorProgramName,
          validatorIndex,
          validator
        }
        break
      }
      if (bonded.validator !== validator) {
        console.warn(
          `delegator ${delegatorProgramName} ${delegator} bonded to ${bonded.validator} instead of ${validator}`
        )
        continue
      }
      if (bonded.microcredits < minBonded) {
        minBonded = bonded.microcredits
        selected = {
          delegatorProgram: delegatorProgramName,
          validatorIndex,
          validator
        }
      }
    }

    if (!selected) {
      console.warn("no selected validator")
      return
    }

    let cache = await this.getCacheState()
    if (cache.state !== CacheStateEnum.VALID) {
      console.warn("bond can only be called when cache is valid")
      return
    }

    await this.execute({
      programName: selected.delegatorProgram,
      functionName: "bond",
      privateFee: false,
      inputs: [u32Str(selected.validatorIndex), selected.validator, u64Str(amount)]
    })
  }

  async unbond() {
    const totalBuffered = await this.getTotalBuffered()
    const totalWithdraw = await this.getTotalWithdraw()
    const totalPendingWithdraw = await this.getTotalPendingWithdraw()
    let amount = totalWithdraw + totalPendingWithdraw - totalBuffered

    if (amount <= 0n) {
      console.log(`no need to unbond`)
      return
    }

    while (amount > 0n) {
      const delegatorBonded = await this.getDelegatorBonded()

      let maxBonded = 0n
      let selected:
        | {
        delegator: string
        validatorIndex: bigint
        validator: string
      }
        | undefined
      for (let { delegator, delegatorProgramName, validatorIndex, validator, bonded } of delegatorBonded) {
        if (!bonded) {
          continue
        }
        if (bonded.validator !== validator) {
          console.warn(
            `delegator ${delegatorProgramName} ${delegator} bonded to ${bonded.validator} instead of ${validator}`
          )
          continue
        }
        if (bonded.microcredits > maxBonded) {
          maxBonded = bonded.microcredits
          selected = {
            delegator,
            validatorIndex,
            validator
          }
        }
      }

      if (!selected || maxBonded <= 0n) {
        console.warn("no selected validator")
        return
      }

      let cache = await this.getCacheState()
      if (cache.state !== CacheStateEnum.VALID) {
        console.warn("unbond can only be called when cache is valid")
        return
      }

      const unbondAmount = amount > maxBonded ? maxBonded : amount
      await this.execute({
        programName: STCREDITS_PROGRAM,
        functionName: "unbond",
        privateFee: false,
        inputs: [u32Str(selected.validatorIndex), selected.validator, selected.delegator, u64Str(unbondAmount)]
      })

      amount -= unbondAmount
    }
  }

  private async getDelegatorBonded() {
    const delegatorValidators = new Map<string, [bigint, string]>()

    const count = await this.getValidatorsCount()
    for (let i = 0n; i < count; i++) {
      const validator = await this.getValidator(Number(i))
      if (!validator) {
        console.warn(`validator ${i} not found`)
        continue
      }
      const delegator = await this.getValidatorDelegator(validator)
      if (!delegator) {
        console.warn(`validator ${i} ${validator} has no delegator`)
        continue
      }
      delegatorValidators.set(delegator, [i, validator])
    }

    const delegatorBonded = new Array<{
      delegator: string
      delegatorProgramName: string
      validatorIndex: bigint
      validator: string
      bonded: BondState | null
    }>()
    for (let i = 0; i < config.delegatorNum; i++) {
      const delegatorProgramName = delegatorProgram(i)
      const delegator = await programAddress(delegatorProgramName)
      const val = delegatorValidators.get(delegator)
      if (!val) {
        console.warn(`validator for delegator ${delegatorProgramName} ${delegator} not found`)
        continue
      }
      const [validatorIndex, validator] = val
      const bonded = await this.credits.getBonded(delegator)
      delegatorBonded.push({ delegator, delegatorProgramName, validatorIndex, validator, bonded })
    }

    return delegatorBonded
  }

  async claimUnbond() {
    const currentHeight = (await this.programManager.networkClient.getLatestHeight()) as number

    const count = await this.getValidatorsCount()
    for (let i = 0n; i < count; i++) {
      const validator = await this.getValidator(Number(i))
      if (!validator) {
        console.warn(`validator ${i} not found`)
        continue
      }
      const delegator = await this.getValidatorDelegator(validator)
      if (!delegator) {
        console.warn(`validator ${i} ${validator} has no delegator`)
        continue
      }
      const unbonding = await this.credits.getUnbonding(delegator)
      if (!unbonding) {
        console.log(`validator ${i} ${validator} has no unbonding`)
        continue
      }
      if (unbonding.height > BigInt(currentHeight)) {
        console.log(
          `validator ${i} ${validator} has unbonding height ${unbonding.height} > current height ${currentHeight}`
        )
        continue
      }

      await this.execute({
        programName: STCREDITS_PROGRAM,
        functionName: "claim_unbond",
        privateFee: false,
        inputs: [u32Str(i), validator, delegator]
      })
    }
  }

  async resolveWithdraw() {
    while (true) {
      const startEnd = await this.getPendingQueueStartEnd()
      if (startEnd.end <= startEnd.start) {
        return
      }

      const firstPendingUser = await this.getPendingQueueUser(Number(startEnd.start))
      if (!firstPendingUser) {
        console.warn("first pending user not found")
        return
      }
      const firstPending = await this.getPendingWithdraw(firstPendingUser)
      if (!firstPending) {
        console.warn("first pending withdraw not found")
        return
      }

      const totalBuffered = await this.getTotalBuffered()
      const totalWithdraw = await this.getTotalWithdraw()
      if (totalBuffered - totalWithdraw < firstPending.amount) {
        return
      }

      await this.execute({
        programName: STCREDITS_PROGRAM,
        functionName: "resolve_withdrawal",
        privateFee: false,
        inputs: []
      })
    }
  }

  async cache(restart: boolean = false) {
    let cache = await this.getCacheState()
    if (cache.state === CacheStateEnum.VALID && !restart) {
      return
    }

    const count = await this.getValidatorsCount()
    if (count <= 0n) {
      return
    }

    let start = cache.state === CacheStateEnum.IN_PROGRESS && !restart ? cache.next_index : 0n
    for (; start < count; start += STCREDITS_CACHE_BATCH_NUM) {
      await this.execute({
        programName: STCREDITS_PROGRAM,
        functionName: "cache_total_bonded_unbonding",
        privateFee: false,
        inputs: [u32Str(start)]
      })
    }

    cache = await this.getCacheState()
    console.log(cache)
  }

  async execute(options: Omit<Parameters<typeof this.programManager.execute>[0], "fee">) {
    // const aleo = await importAleo()
    // const fee = await aleo.ProgramManagerBase.estimateExecutionFee(this.programManager.account!.privateKey(), options.programName, options.functionName, options.inputs)
    // const txId = await this.programManager.execute({...options, fee: Number(fee)/1_000_000})
    const txId = await this.programManager.execute({ ...options, fee: 0 })
    const transaction = await this.programManager.networkClient.getTransaction(txId as string)
    console.log(transaction)
    return transaction
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

await run()

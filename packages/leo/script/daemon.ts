import type { ProgramManager } from "@aleohq/sdk"
import {
  importAleo,
  programAddress,
  delegatorProgramName as getDelegatorProgramName,
  STCREDITS_CACHE_BATCH_NUM,
  STCREDITS_PROGRAM,
  CacheStatus,
  StCreditsProgram as StCreditsProgramBase,
  u32Str,
  u64Str,
  BondState,
  initialize,
  CreditsProgram,
  Delegator
} from "spectre"
import config from "../config.json"
import {
  delay,
  ENDPOINT,
  execute,
  programPath,
  queryMappingValue,
  STAKING_OPERATOR_PRIVATE_KEY
} from "./util"

export async function run() {
  initialize(config)

  const aleo = await importAleo()

  const { Account, AleoKeyProvider, NetworkRecordProvider, ProgramManager } = aleo

  const account = new Account({
    privateKey: STAKING_OPERATOR_PRIVATE_KEY
  })

  const programManager = new ProgramManager(ENDPOINT)
  programManager.setAccount(account)

  ;(programManager.networkClient as any).getProgram = async (programId: string) => {
    const url = programManager.networkClient.host + `/program/${programId}`
    const response = await fetch(url, {
      headers: programManager.networkClient.headers
    })

    if (!response.ok) {
      throw new Error(response.status + " could not get URL " + url)
    }

    return await response.text()
  }

  const keyProvider = new AleoKeyProvider()
  keyProvider.useCache(true)
  const recordProvider = new NetworkRecordProvider(account, programManager.networkClient)
  programManager.keyProvider = keyProvider
  programManager.recordProvider = recordProvider

  // const period = 5 * 60 * 1000 // 5min
  const period = 5000
  // eslint-disable-next-line no-constant-condition
  for (let i = 0; ; i++) {
    console.log(`******************** ${i} ********************`)
    const startAt = Date.now()

    try {
      await operate(programManager)
    } catch (err) {
      console.error(err)
    }

    const elapsed = Date.now() - startAt
    await delay(Math.min(elapsed > period ? 0 : period - elapsed, 10 * 1000))
  }
}

async function operate(programManager: ProgramManager) {
  const stcreditsProgram = new StCreditsProgram(programManager)

  const cfg = await stcreditsProgram.getConfig()

  if (!cfg) {
    console.log("stcredits program is not initialized")
    return
  }
  if (cfg.paused) {
    console.log("stcredits program is paused")
    return
  }

  await stcreditsProgram.claimUnbond()
  await delay(2000)
  await stcreditsProgram.resolveWithdraw()
  await delay(2000)
  await stcreditsProgram.cache()
  await delay(2000)
  // unbond can only be called after cache is finished successfully
  await stcreditsProgram.unbond()
  await delay(2000)
  await stcreditsProgram.cache()
  await delay(2000)
  // bond can only be called after cache is finished successfully
  await stcreditsProgram.bond()
  await delay(2000)
}

class StCreditsProgram extends StCreditsProgramBase {
  constructor(private programManager: ProgramManager) {
    super(
      async (mapping, key) =>
        (await programManager.networkClient.getProgramMappingValue(STCREDITS_PROGRAM(), mapping, key)) as string,
      new CreditsProgram(async (mapping: string, key: string) => {
        return await queryMappingValue("credits", mapping, key)
      })
    )
  }

  async bond() {
    const state = await this.getState()
    const totalBuffered = await this.getTotalBuffered()
    const totalWithdraw = state.withdraw
    const totalPendingWithdraw = state.pending_withdraw
    const totalUnbonding = state.unbonding
    const amount1 = totalBuffered - totalWithdraw
    const amount2 = totalBuffered + totalUnbonding - totalWithdraw - totalPendingWithdraw
    const amount = amount1 < amount2 ? amount1 : amount2

    if (amount < BigInt(1e6)) {
      console.log(`no enough buffered amount to bond: ${amount}`)
      return
    }

    const delegatorBonded = await this.getDelegatorBonded()

    let minBonded = BigInt(Number.MAX_SAFE_INTEGER)
    let selected:
      | {
      delegator: string
      delegatorProgram: string
      delegatorProgramPath: string
      index: bigint
      validator: string
    }
      | undefined
    for (let {
      delegator,
      delegatorProgramName,
      delegatorProgramPath,
      index,
      validator,
      bonded
    } of delegatorBonded) {
      if (!bonded) {
        if (amount < BigInt(1e4 * 1e6)) {
          // must bond at least 10k for a delegator for first time
          continue
        }
        minBonded = 0n
        selected = {
          delegator,
          delegatorProgram: delegatorProgramName,
          delegatorProgramPath,
          index,
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
          delegator,
          delegatorProgram: delegatorProgramName,
          delegatorProgramPath,
          index,
          validator
        }
      }
    }

    if (!selected) {
      console.warn("no selected delegator")
      return
    }

    let cache = await this.getCacheState()
    if (cache.status !== CacheStatus.VALID) {
      console.warn("bond can only be called when cache is valid")
      return
    }

    await this.execute(selected.delegatorProgramPath, {
      programName: selected.delegatorProgram,
      functionName: "bond",
      privateFee: false,
      inputs: [selected.validator, u64Str(amount)]
    })
  }

  async unbond() {
    const state = await this.getState()
    const totalBuffered = await this.getTotalBuffered()
    const totalWithdraw = state.withdraw
    const totalPendingWithdraw = state.pending_withdraw
    const totalUnbonding = state.unbonding
    let amount = totalWithdraw + totalPendingWithdraw - totalBuffered - totalUnbonding

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
        index: bigint
        validator: string
      }
        | undefined
      for (let { delegator, delegatorProgramName, index, validator, bonded } of delegatorBonded) {
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
            index,
            validator
          }
        }
      }

      if (!selected || maxBonded <= 0n) {
        console.warn("no selected delegator")
        return
      }

      let cache = await this.getCacheState()
      if (cache.status !== CacheStatus.VALID) {
        console.warn("unbond can only be called when cache is valid")
        return
      }

      const unbondAmount = amount > maxBonded ? maxBonded : amount
      await this.execute(
        programPath(config.programs.staking.stcredits),
        {
          programName: STCREDITS_PROGRAM(),
          functionName: "unbond",
          privateFee: false,
          inputs: [selected.delegator, u64Str(unbondAmount)]
        })

      amount -= unbondAmount
    }
  }

  private async getDelegatorBonded() {
    const delegators = new Map<string, [bigint, Delegator]>()

    const count = await this.getDelegatorsCount()
    for (let i = 0n; i < count; i++) {
      const delegator = await this.getDelegator(i)
      if (!delegator) {
        console.warn(`delegator ${i} not found`)
        continue
      }
      delegators.set(delegator.delegator, [i, delegator])
    }

    const delegatorBonded = new Array<{
      delegator: string
      delegatorProgramName: string
      delegatorProgramPath: string
      index: bigint
      validator: string
      bonded: BondState | null
    }>()
    for (let i = 0; i < config.delegatorNum; i++) {
      const delegatorProgramPath = programPath(config.programs.staking.delegator, i + 1)
      const delegatorProgramName = getDelegatorProgramName(i)
      const delegatorAddr = await programAddress(delegatorProgramName)
      const del = delegators.get(delegatorAddr)
      if (!del) {
        console.warn(`delegator ${delegatorProgramName} ${delegatorAddr} not found`)
        continue
      }
      const [index, delegator] = del
      const bonded = await this.credits.getBonded(delegator.delegator)
      delegatorBonded.push({
        delegator: delegator.delegator,
        delegatorProgramName,
        delegatorProgramPath,
        index,
        validator: delegator.validator,
        bonded
      })
    }

    console.log("delegators:", delegatorBonded)
    return delegatorBonded
  }

  async claimUnbond() {
    const currentHeight = (await this.programManager.networkClient.getLatestHeight()) as number

    const count = await this.getDelegatorsCount()
    for (let i = 0n; i < count; i++) {
      const del = await this.getDelegator(i)
      if (!del) {
        console.warn(`delegator ${i} not found`)
        continue
      }
      const delegator = del.delegator
      const unbonding = await this.credits.getUnbonding(delegator)
      if (!unbonding) {
        console.log(`delegator ${i} ${delegator} has no unbonding`)
        continue
      }
      if (unbonding.height > BigInt(currentHeight)) {
        console.log(
          `delegator ${i} ${delegator} has unbonding height ${unbonding.height} > current height ${currentHeight}`
        )
        continue
      }

      await this.execute(
        programPath(config.programs.staking.stcredits),
        {
          programName: STCREDITS_PROGRAM(),
          functionName: "claim_unbond",
          privateFee: false,
          inputs: [delegator]
        })
    }
  }

  async resolveWithdraw() {
    while (true) {
      const state = await this.getState()
      const totalBuffered = await this.getTotalBuffered()
      const totalWithdraw = state.withdraw
      const totalPendingWithdraw = state.pending_withdraw
      if (totalPendingWithdraw <= 0n) {
        return
      }
      let amount = totalBuffered - totalWithdraw
      if (amount <= 0n) {
        return
      }

      amount = totalPendingWithdraw > amount ? amount : totalPendingWithdraw

      // TODO: calculate an appropriate height

      await this.execute(
        programPath(config.programs.staking.stcredits),
        {
          programName: STCREDITS_PROGRAM(),
          functionName: "resolve_withdrawal_force",
          privateFee: false,
          inputs: [u64Str(amount), u32Str(0)]
        })
    }
  }

  async cache(restart: boolean = false) {
    let cache = await this.getCacheState()
    if (cache.status === CacheStatus.VALID && !restart) {
      console.log("cache is already valid")
      return
    }

    const count = await this.getDelegatorsCount()
    if (count <= 0n) {
      console.log("no need to cache, since no delegator")
      return
    }

    let start = cache.status === CacheStatus.IN_PROGRESS && !restart ? cache.next_index : 0n
    for (; start < count; start += STCREDITS_CACHE_BATCH_NUM) {
      await this.execute(
        programPath(config.programs.staking.stcredits),
        {
          programName: STCREDITS_PROGRAM(),
          functionName: "cache",
          privateFee: false,
          inputs: [u32Str(start)]
        })
    }

    cache = await this.getCacheState()
    console.log(cache)
  }

  async execute(programPath: string, options: Omit<Parameters<typeof this.programManager.execute>[0], "fee">) {
    console.log({
      programPath,
      program: options.programName,
      function: options.functionName,
      inputs: options.inputs
    })
    return execute(programPath, options.functionName, options.inputs, this.programManager.account!.privateKey().to_string())

    // const aleo = await importAleo()
    // const fee = await aleo.ProgramManagerBase.estimateExecutionFee(this.programManager.account!.privateKey(), options.programName, options.functionName, options.inputs)
    // const txId = await this.programManager.execute({...options, fee: Number(fee)/1_000_000})

    /*
    const txId = await this.programManager.execute({ ...options, fee: 0 })
    const transaction = await this.programManager.networkClient.getTransaction(txId as string)
    console.log(transaction)
    return transaction
    */
  }
}

await run()

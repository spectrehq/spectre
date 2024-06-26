import 'dotenv/config'
import {
  Account,
  AleoKeyProvider,
  initializeWasm,
  initThreadPool,
  NetworkRecordProvider,
  ProgramManager,
} from '@aleohq/sdk'

export async function run() {
  await initializeWasm()
  await initThreadPool()

  const account = new Account({
    privateKey: process.env.PRIVATE_KEY,
  })

  const programManager = new ProgramManager()
  programManager.networkClient.host = 'https://api.explorer.aleo.org/v1/testnet'
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

const STCREDITS_PROGRAM = process.env.STCREDITS_PROGRAM as string
// const DELEGATOR_PROGRAM = process.env.DELEGATOR_PROGRAM as string

const PLACEHOLDER_KEY = '0u8'

type Config = {
  treasury: string
  paused: string
}

async function operate(programManager: ProgramManager) {
  const networkClient = programManager.networkClient

  const config: Config = JSON.parse(
    (await networkClient.getProgramMappingValue(STCREDITS_PROGRAM, 'config', PLACEHOLDER_KEY)) as string
  )

  if (config.paused === 'true') {
    return
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

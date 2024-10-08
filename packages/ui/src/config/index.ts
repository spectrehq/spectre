import type { Network } from '~/types'

export const APP_NAME = 'AleoStaking'

export const CREDITS_PROGRAM_IDS: Record<Network, string> = {
  testnet: 'credits.aleo',
}

export const STCREDITS_PROGRAM_IDS: Record<Network, string> = {
  testnet: 'staking_stcredits_v1_001.aleo',
}

export const STCREDITS_POINTS_PROGRAM_IDS: Record<Network, string> = {
  testnet: 'staking_stcredits_points_v1_001.aleo',
}

export const MULTI_TOKEN_SUPPORT_PROGRAM_IDS: Record<Network, string> = {
  testnet: 'multi_token_support_program.aleo',
}

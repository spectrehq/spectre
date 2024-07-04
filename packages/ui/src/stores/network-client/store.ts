import {
  CreditsProgram,
  StCreditsPointsProgram,
  StCreditsProgram,
} from 'spectre'
import { createStore } from 'zustand/vanilla'
import {
  CREDITS_PROGRAM_IDS,
  STCREDITS_PROGRAM_IDS,
  STCREDITS_POINTS_PROGRAM_IDS,
} from '~/config'
import { Network } from '~/types'

export const DEFAULT_HOST = 'https://api.explorer.aleo.org/v1'
export const DEFAULT_NETWORK: Network = Network.Testnet

export type NetworkClientState = {
  host: string
  network: Network

  creditsProgram: CreditsProgram
  stCreditsProgram: StCreditsProgram
  stCreditsPointsProgram: StCreditsPointsProgram
}

export type NetworkClientActions = {
  setHost: (host: string) => void
  setNetwork: (network: Network) => void
}

export type NetworkClientStore = NetworkClientState & NetworkClientActions

export const defaultNetworkClientState: NetworkClientState = {
  host: DEFAULT_HOST,
  network: DEFAULT_NETWORK,

  creditsProgram: new CreditsProgram(
    generateGetMappingValueString(
      DEFAULT_HOST,
      DEFAULT_NETWORK,
      CREDITS_PROGRAM_IDS[DEFAULT_NETWORK]
    )
  ),
  stCreditsProgram: new StCreditsProgram(
    generateGetMappingValueString(
      DEFAULT_HOST,
      DEFAULT_NETWORK,
      STCREDITS_PROGRAM_IDS[DEFAULT_NETWORK]
    )
  ),
  stCreditsPointsProgram: new StCreditsPointsProgram(
    generateGetMappingValueString(
      DEFAULT_HOST,
      DEFAULT_NETWORK,
      STCREDITS_POINTS_PROGRAM_IDS[DEFAULT_NETWORK]
    )
  ),
}

export const createNetworkClientStore = (
  initState: NetworkClientState = defaultNetworkClientState
) =>
  createStore<NetworkClientStore>()((set, get) => ({
    ...initState,
    setHost: (host) => {
      const network = get().network

      const creditsProgram = new CreditsProgram(
        generateGetMappingValueString(
          host,
          network,
          CREDITS_PROGRAM_IDS[network]
        )
      )

      const stCreditsProgram = new StCreditsProgram(
        generateGetMappingValueString(
          host,
          network,
          STCREDITS_PROGRAM_IDS[network]
        )
      )

      const stCreditsPointsProgram = new StCreditsPointsProgram(
        generateGetMappingValueString(
          host,
          network,
          STCREDITS_POINTS_PROGRAM_IDS[network]
        )
      )

      set({ host, creditsProgram, stCreditsProgram, stCreditsPointsProgram })
    },
    setNetwork: (network) => {
      const host = get().host

      const creditsProgram = new CreditsProgram(
        generateGetMappingValueString(
          host,
          network,
          CREDITS_PROGRAM_IDS[network]
        )
      )

      const stCreditsProgram = new StCreditsProgram(
        generateGetMappingValueString(
          host,
          network,
          STCREDITS_PROGRAM_IDS[network]
        )
      )

      const stCreditsPointsProgram = new StCreditsPointsProgram(
        generateGetMappingValueString(
          host,
          network,
          STCREDITS_POINTS_PROGRAM_IDS[network]
        )
      )

      set({ network, creditsProgram, stCreditsProgram, stCreditsPointsProgram })
    },
  }))

function generateGetMappingValueString(
  host: string,
  network: Network,
  programId: string
) {
  return async (mapping: string, key: string) =>
    fetch(`${host}/${network}/program/${programId}/mapping/${mapping}/${key}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
}
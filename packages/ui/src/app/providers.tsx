'use client'

import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react'
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui'
import { PuzzleWalletProvider } from '@puzzlehq/sdk'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { useMemo, type PropsWithChildren } from 'react'
import {
  CREDITS_PROGRAM_IDS,
  STCREDITS_PROGRAM_IDS,
  STCREDITS_POINTS_PROGRAM_IDS,
} from '~/config'
import { FoxWalletAdapter } from '~/lib/foxwallet'
import { getQueryClient } from '~/lib/query'
import { useNetworkClientStore } from '~/stores/network-client'

export function Providers({ children }: PropsWithChildren) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'AleoStaking',
      }),
      new FoxWalletAdapter({
        appName: 'AleoStaking',
      }),
    ],
    []
  )

  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  const network = useNetworkClientStore((store) => store.network)
  const creditsProgramId = CREDITS_PROGRAM_IDS[network]
  const stCreditsProgramId = STCREDITS_PROGRAM_IDS[network]
  const stCreditsPointsProgramId = STCREDITS_POINTS_PROGRAM_IDS[network]

  return (
    <WalletProvider
      wallets={wallets}
      // network={WalletAdapterNetwork.MainnetBeta}
      // @ts-ignore
      network="mainnet"
      decryptPermission={DecryptPermission.OnChainHistory}
      programs={[
        creditsProgramId,
        stCreditsProgramId,
        stCreditsPointsProgramId,
      ]}
      autoConnect
    >
      <WalletModalProvider>
        <PuzzleWalletProvider
          dAppName="AleoStaking"
          dAppDescription=""
          dAppIconURL=""
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
              {children}
            </ReactQueryStreamedHydration>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
              />
            )}
          </QueryClientProvider>
        </PuzzleWalletProvider>
      </WalletModalProvider>
    </WalletProvider>
  )
}

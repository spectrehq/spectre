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
import { getQueryClient } from '~/lib/query'
import { NetworkClientStoreProvider } from '~/stores/network-client'

export function Providers({ children }: PropsWithChildren) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
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

  return (
    <WalletProvider
      wallets={wallets}
      network={WalletAdapterNetwork.TestnetBeta}
      decryptPermission={DecryptPermission.AutoDecrypt}
      programs={['credits.aleo', 'spectre_stcredits_v1_001.aleo']}
      autoConnect
    >
      <WalletModalProvider>
        <PuzzleWalletProvider
          dAppName="AleoStaking"
          dAppDescription=""
          dAppIconURL=""
        >
          <NetworkClientStoreProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryStreamedHydration>
                {children}
              </ReactQueryStreamedHydration>
              {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </QueryClientProvider>
          </NetworkClientStoreProvider>
        </PuzzleWalletProvider>
      </WalletModalProvider>
    </WalletProvider>
  )
}

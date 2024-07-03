'use client'

import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react'
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui'
import { PuzzleWalletProvider } from '@puzzlehq/sdk'
import { useMemo, type PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'AleoStaking',
      }),
    ],
    []
  )

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
          {children}
        </PuzzleWalletProvider>
      </WalletModalProvider>
    </WalletProvider>
  )
}

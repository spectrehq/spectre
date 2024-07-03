import {
  DecryptPermission,
  WalletAdapterNetwork,
  type WalletAdapter,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { Button } from '~/components/ui/button'

export interface WalletItemProps {
  wallet: WalletAdapter
  onConnected?: () => void
}

export function WalletItem({ wallet, onConnected }: WalletItemProps) {
  const { connect, select } = useWallet()

  const handleConnectWallet = useCallback(async () => {
    try {
      select(wallet.name)
      await connect(
        DecryptPermission.AutoDecrypt,
        WalletAdapterNetwork.TestnetBeta
      )
    } catch (error) {}
    onConnected?.()
  }, [wallet.name, select, connect, onConnected])

  return (
    <Button
      className="w-full justify-start px-6"
      variant="secondary"
      size="lg"
      onClick={handleConnectWallet}
    >
      <Image
        src={wallet.icon}
        alt={wallet.name}
        width={20}
        height={20}
        className="mr-2"
      />
      <span>{wallet.name}</span>
    </Button>
  )
}

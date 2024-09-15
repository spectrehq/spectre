import {
  DecryptPermission,
  WalletAdapterNetwork,
  type WalletConnectionError,
  WalletReadyState,
  type WalletAdapter,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { Button } from '~/components/ui/button'
import { useAccountStore } from '~/stores/account'

export interface WalletItemProps {
  wallet: WalletAdapter
  onConnected?: () => void
}

export function WalletItem({ wallet, onConnected }: WalletItemProps) {
  const setIsConnecting = useAccountStore((store) => store.setIsConnecting)
  const { connect, select, wallets } = useWallet()

  const handleConnectWallet = useCallback(async () => {
    try {
      select(wallet.name)
      // await connect(
      //   DecryptPermission.AutoDecrypt,
      //   WalletAdapterNetwork.TestnetBeta
      // )

      const walletAdapter = wallets.find(
        (w) => w.adapter.name === wallet.name
      )?.adapter

      if (walletAdapter?.readyState === WalletReadyState.NotDetected) {
        // TODO
        if (wallet.name === 'LeoWallet') {
          open('https://www.leo.app/download', '_blank', 'noreferrer')
        }

        if (wallet.name === 'Fox Wallet') {
          open('https://foxwallet.com/download', '_blank', 'noreferrer')
        }
      }

      if (walletAdapter?.readyState === WalletReadyState.Installed) {
        setIsConnecting(true)
        if (wallet.name === 'LeoWallet') {
          await walletAdapter?.connect(
            DecryptPermission.OnChainHistory,
            // @ts-ignore
            'mainnet'
          )
        } else if (wallet.name === 'Fox Wallet') {
          await walletAdapter?.connect(
            DecryptPermission.OnChainHistory,
            // @ts-ignore
            'mainnet'
          )
        }
      }
    } catch (e) {
      console.log(e)
      if ((e as Error).name === 'WalletConnectionError') {
        const error = e as WalletConnectionError
        if (error.message === 'Permission Not Granted') {
          setIsConnecting(false)
        }

        // if (error.message === 'The wallet is not available') {
        //   setIsConnecting(false)
        // }
      }

      // TODO: WalletNotSelectedError
    }
    onConnected?.()
  }, [setIsConnecting, onConnected, select, wallet.name, wallets])

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

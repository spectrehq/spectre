'use client'

import { WalletReadyState } from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useConnect } from '@puzzlehq/sdk'
import { DialogTitle } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { Button, type ButtonProps } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog'
import { useAccount } from '~/hooks/use-account'
import WalletConnectLogo from '~/assets/wallet-connect-logo.svg'
import { WalletItem } from './wallet-item'

export interface WalletConnectionCheckerProps extends ButtonProps {
  open?: boolean
}

export function WalletConnectionChecker({
  children,
  open: openProps,
  ...props
}: WalletConnectionCheckerProps) {
  const [open, setOpen] = useState(openProps ?? false)

  const { wallets } = useWallet()
  const { connect } = useConnect()

  const { address, isConnected } = useAccount()

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleConnect = useCallback(async () => {
    try {
      await connect()
    } catch (error) {}

    setOpen(false)
  }, [connect])

  if (isConnected && address) return <>{children}</>

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button {...props}>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Select Wallet</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ul className="space-y-2">
          {wallets
            .filter(
              (wallet) => wallet.readyState === WalletReadyState.Installed
            )
            .map((wallet) => (
              <li key={wallet.adapter.name}>
                <WalletItem wallet={wallet.adapter} onConnected={handleClose} />
              </li>
            ))}
          <li>
            <Button
              className="w-full justify-start px-6"
              variant="secondary"
              size="lg"
              onClick={handleConnect}
            >
              <Image
                src={WalletConnectLogo}
                alt="Wallet Connect"
                width={24}
                height={24}
                className="mr-2 rounded-sm bg-[#3396ff] py-1"
              />
              Wallet Connect
            </Button>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { CopyCheckIcon, CopyIcon, UnplugIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { useAccount } from '~/hooks/use-account'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { useDisconnect } from '~/hooks/use-disconnect'
import { shortenAddress } from '~/utils'

export interface AccountInfoProps {
  onDisconnect?: () => void
}

export function AccountInfo({ onDisconnect }: AccountInfoProps) {
  const { address, walletType, walletName } = useAccount()
  const { disconnect } = useDisconnect()

  const handleDisconnectWallet = useCallback(async () => {
    await disconnect()
    onDisconnect?.()
  }, [disconnect, onDisconnect])

  const [isCopied, setIsCopied] = useState(false)
  const [, copy] = useCopyToClipboard()

  const handleCopyAddress = useCallback(async () => {
    if (!address) return
    setIsCopied(await copy(address))
  }, [address, copy])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 5000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isCopied])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Connected to {walletName ?? 'Wallet'}
        </p>
        <Button variant="secondary" size="sm" onClick={handleDisconnectWallet}>
          <UnplugIcon className="mr-1 h-3 w-3" />
          Disconnect
        </Button>
      </div>
      <div>
        <div className="flex items-center">
          <p className="font-medium text-lg">
            {address && shortenAddress(address)}
          </p>
          <Button
            className="ml-2 h-auto w-auto"
            variant="ghost"
            size="icon"
            onClick={handleCopyAddress}
          >
            {isCopied ? (
              <CopyCheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div>
          <Button
            className="h-auto px-0 text-xs"
            variant="link"
            size="sm"
            asChild
          >
            <Link
              href={`https://explorer.aleo.org/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on explorer
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

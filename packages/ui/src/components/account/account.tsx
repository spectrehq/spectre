'use client'

import * as dn from 'dnum'
import { Wallet2Icon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { shortenAddress } from '~/utils'
import { AccountInfo } from './account-info'
import { GradientsAvatar } from '../gradients-avatar'

export function Account() {
  const [open, setOpen] = useState(false)
  const { address } = useAccount()
  const { data: balance } = useBalance(address)

  const balanceDN = useMemo(() => {
    return dn.from([balance ?? 0n, 6])
  }, [balance])

  const handleDisconnectWallet = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
      <WalletConnectionChecker
        className="border-muted-foreground h-9 px-3 lg:h-10 lg:px-4"
        variant="outline"
      >
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Wallet2Icon className="h-5 w-5" />
            {address && (
              <>
                <span className="mx-2">{shortenAddress(address)}</span>
                <GradientsAvatar text={address} size={20} />
              </>
            )}
          </Button>
        </DialogTrigger>
      </WalletConnectionChecker>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
        </DialogHeader>
        <AccountInfo onDisconnect={handleDisconnectWallet} />
      </DialogContent>
    </Dialog>
  )
}

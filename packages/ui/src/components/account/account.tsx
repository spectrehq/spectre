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
        className="hidden lg:inline-flex border-muted-foreground"
        variant="outline"
      >
        <DialogTrigger asChild>
          <Button className="hidden lg:inline-flex">
            {dn.format(balanceDN, 2)} ALEO
            <Wallet2Icon className="mx-2 h-5 w-5" />
            {address && shortenAddress(address)}
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

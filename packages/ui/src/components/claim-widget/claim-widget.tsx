'use client'

import * as dn from 'dnum'
import { useCallback, useMemo } from 'react'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { usePendingWithdraw } from '~/hooks/use-pending-withdraw'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { useUserWithdraw } from '~/hooks/use-user-withdraw'
import { useClaim } from '~/hooks/use-claim'
import { useBlockHeight } from '~/hooks/use-block-height'

export function ClaimWidget() {
  const { address } = useAccount()

  const { data: stCreditsBalance } = useStCreditsBalance(address)

  const balanceDN = useMemo(
    () => dn.from([stCreditsBalance ?? 0n, 6]),
    [stCreditsBalance]
  )

  const { data: userWithdraw } = useUserWithdraw(address)

  const { data: pendingWithdraw } = usePendingWithdraw(address)

  const userWithdrawAmountDN = useMemo(
    () => dn.from([userWithdraw?.amount ?? 0n, 6]),
    [userWithdraw]
  )

  const pendingWithdrawAmountDN = useMemo(
    () => dn.from([pendingWithdraw?.amount ?? 0n, 6]),
    [pendingWithdraw]
  )

  const { data: latestBlockHeight } = useBlockHeight()

  const isClaimable = useMemo(() => {
    if (!userWithdraw || !latestBlockHeight) {
      return false
    }

    return userWithdraw.height <= BigInt(latestBlockHeight)
  }, [userWithdraw, latestBlockHeight])

  const action = useMemo(() => {
    if (!userWithdraw || !latestBlockHeight || userWithdraw.amount <= 0n) {
      return 'Claim'
    }

    if (userWithdraw.height > BigInt(latestBlockHeight)) {
      return `After ${userWithdraw.height - BigInt(latestBlockHeight)} blocks`
    }

    return 'Claim'
  }, [latestBlockHeight, userWithdraw])

  const { mutate, isPending } = useClaim()

  const handleClaim = useCallback(async () => {
    if (!address || !userWithdraw) return

    const fee = 250_000 // TODO

    mutate({ amount: userWithdraw.amount, fee })
  }, [address, mutate, userWithdraw])

  return (
    <div className="rounded-xl bg-foreground max-w-lg mx-auto">
      <div className="p-6 text-background">
        <div className="grid">
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              stALEO Balance
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {dn.format(balanceDN, { digits: 2, trailingZeros: true })} stALEO
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-2">
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              Queuing withdraw
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {dn.format(pendingWithdrawAmountDN, {
                digits: 2,
                trailingZeros: true,
              })}{' '}
              stALEO
            </div>
          </div>
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              Withdrawals ahead
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">-</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="text-center py-10">
          <span className="text-5xl font-semibold">
            {dn.format(userWithdrawAmountDN, {
              digits: 2,
              trailingZeros: true,
            })}
          </span>
          <span className="text-xl">ALEO</span>
        </div>
        <WalletConnectionChecker className="w-full" size="xl">
          <Button
            className="w-full"
            size="xl"
            disabled={!isClaimable || isPending}
            onClick={handleClaim}
          >
            {action}
          </Button>
        </WalletConnectionChecker>
      </div>
    </div>
  )
}

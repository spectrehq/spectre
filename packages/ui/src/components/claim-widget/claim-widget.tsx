'use client'

import { useQueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { CircleHelpIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo } from 'react'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBlockHeight } from '~/hooks/use-block-height'
import { useClaim } from '~/hooks/use-claim'
import { usePendingWithdraw } from '~/hooks/use-pending-withdraw'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { useUserWithdraw } from '~/hooks/use-user-withdraw'
import { cn } from '~/lib/utils'

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

  const { mutate, isPending, isSuccess } = useClaim()

  const handleClaim = useCallback(async () => {
    if (!address || !userWithdraw) return

    const fee = 250_000 // TODO

    mutate({ amount: userWithdraw.amount, fee })
  }, [address, mutate, userWithdraw])

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) {
      void queryClient.refetchQueries()
    }
  }, [isSuccess, queryClient])

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          You will be able to claim your rewards after the withdraw request has
          been processed. To unstake your amount go to{' '}
          <Button className="p-0 h-auto text-sky-400" variant="link" asChild>
            <Link className="" href="/liquid-staking/unstake">
              Unstake
            </Link>
          </Button>{' '}
          tab.
        </div>

        <div className="rounded-xl bg-muted grid grid-cols-2 gap-2 p-5 mb-6">
          <div>
            <div className="text-sm text-muted-foreground">
              Withdrawal amount
            </div>
            <div className="text-lg font-bold">
              {dn.format(userWithdrawAmountDN, { digits: 6, locale: 'en' })}{' '}
              Credits
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground flex items-center">
              Estimated claimable block
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelpIcon className="w-4 h-4 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      If there&apos;s not enough liquidity in the liquid staking
                      pool, we must wait for the operator service to unbond from
                      the validators, and the claimable block cannot be
                      estimated.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-lg">
              {userWithdraw && latestBlockHeight ? (
                <>
                  <p className="text-lg">
                    {dn.format([userWithdraw.height, 0])}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Current height: {dn.format([BigInt(latestBlockHeight), 0])}
                  </p>
                </>
              ) : (
                '-'
              )}
            </div>
          </div>
        </div>

        <WalletConnectionChecker
          className="w-full"
          size="xl"
          variant="secondary"
        >
          <Button
            className="w-full"
            variant="secondary"
            size="xl"
            disabled={!isClaimable || isPending}
            onClick={handleClaim}
          >
            {isPending && (
              <Loader2Icon className={cn('mr-2 h-4 w-4 animate-spin')} />
            )}
            {isPending ? 'Waiting for wallet confirmation' : 'Claim'}
          </Button>
        </WalletConnectionChecker>
      </div>
    </div>
  )
}

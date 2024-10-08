'use client'

import { useQueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { CircleHelpIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionStatusAlert } from '~/components/transaction-status-alert'
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
import { useUserWithdraw } from '~/hooks/use-user-withdraw'
import { cn } from '~/lib/utils'

export function ClaimWidget() {
  const { address } = useAccount()

  const { data: userWithdraw } = useUserWithdraw(address)

  const { data: pendingWithdraw } = usePendingWithdraw(address)

  const userWithdrawAmountDN = useMemo(
    () => dn.from([userWithdraw?.amount ?? 0n, 6]),
    [userWithdraw]
  )

  const { data: latestBlockHeight } = useBlockHeight()

  const isClaimable = useMemo(() => {
    if (!userWithdraw || !latestBlockHeight) {
      return false
    }

    return userWithdraw.height <= BigInt(latestBlockHeight)
  }, [userWithdraw, latestBlockHeight])

  const { claim, isPending, isSuccess, reset, transactionStatus } = useClaim()

  const [userWithdrawAmountDNCache, setUserWithdrawAmountDNCache] =
    useState<dn.Dnum>([0n, 6])

  const handleClaim = useCallback(async () => {
    if (!address || !userWithdraw) return

    setUserWithdrawAmountDNCache(userWithdrawAmountDN)
    claim(userWithdraw.amount)
  }, [address, claim, userWithdraw, userWithdrawAmountDN])

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) {
      void queryClient.refetchQueries({
        predicate: ({ queryKey }) => queryKey.includes(address),
      })
    }
  }, [isSuccess, queryClient, address])

  const isShowTransactionStatusAlert = useMemo(
    () => Boolean(transactionStatus),
    [transactionStatus]
  )

  const handleTransactionStatusAlertClose = useCallback(() => {
    reset()
  }, [reset])

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
      {isShowTransactionStatusAlert && (
        <TransactionStatusAlert
          title={{
            Creating: `You are claiming ${dn.format(userWithdrawAmountDNCache, 6)} Credits`,
            Pending: `You are claiming ${dn.format(userWithdrawAmountDNCache, 6)} Credits`,
            Settled: `You have claimed ${dn.format(userWithdrawAmountDNCache, 6)} Credits`,
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
          onClose={handleTransactionStatusAlertClose}
        />
      )}
    </div>
  )
}

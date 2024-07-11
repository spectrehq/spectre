'use client'

import * as dn from 'dnum'
import { useCallback, useMemo } from 'react'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBlockHeight } from '~/hooks/use-block-height'
import { useCreditsUnbonding } from '~/hooks/use-credits-unbonding'
import { useCreditsClaim } from '~/hooks/use-credits-claim'

export function CreditsClaimWidget() {
  const { address } = useAccount()

  const { data: unbonding } = useCreditsUnbonding(address)

  const unbondingCreditsDN = useMemo(
    () => dn.from([unbonding?.microcredits ?? 0n, 6]),
    [unbonding]
  )

  const { data: latestBlockHeight } = useBlockHeight()

  const isClaimable = useMemo(() => {
    if (!unbonding || !latestBlockHeight) {
      return false
    }

    return unbonding.height <= BigInt(latestBlockHeight)
  }, [unbonding, latestBlockHeight])

  const action = useMemo(() => {
    if (!unbonding || !latestBlockHeight || unbonding.microcredits <= 0n) {
      return 'Claim'
    }

    if (unbonding.height > BigInt(latestBlockHeight)) {
      return `After ${unbonding.height - BigInt(latestBlockHeight)} blocks`
    }

    return 'Claim'
  }, [latestBlockHeight, unbonding])

  const { mutate, isPending } = useCreditsClaim()

  const handleClaim = useCallback(async () => {
    if (!address || !unbonding) return

    const fee = 250_000 // TODO

    mutate({ staker: address, fee })
  }, [address, mutate, unbonding])

  return (
    <div className="rounded-xl bg-secondary-foreground min-w-96 max-w-lg mx-auto">
      <div className="p-6 text-background">
        <div className="grid">
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              Withdrawing Credits
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {dn.format(unbondingCreditsDN, {
                digits: 2,
                trailingZeros: true,
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="text-center py-10">
          <span className="text-5xl font-semibold">
            {dn.format(unbondingCreditsDN, {
              digits: 2,
              trailingZeros: true,
            })}
          </span>
          <span className="text-xl">Credits</span>
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

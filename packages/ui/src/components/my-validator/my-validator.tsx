'use client'

import * as dn from 'dnum'
import { CircleHelpIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { BondDialog } from '~/components/bond-dialog'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { UnbondDialog } from '~/components/unbond-dialog'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBlockHeight } from '~/hooks/use-block-height'
import { useBondState } from '~/hooks/use-bond-state'
import { useCreditsClaim } from '~/hooks/use-credits-claim'
import { useCreditsUnbonding } from '~/hooks/use-credits-unbonding'
import { cn } from '~/lib/utils'
import type { AleoAddress } from '~/types'
import { ValidatorInfo } from './validator-info'

export function MyValidator() {
  const { address } = useAccount()

  const { data: latestBlockHeight = 0 } = useBlockHeight()

  const { data: bondState } = useBondState(address)
  const bondedCreditsDN = useMemo(
    () => dn.from([bondState?.microcredits ?? 0n, 6]),
    [bondState]
  )

  const { data: unbonding } = useCreditsUnbonding(address)
  const unbondingCreditsDN = useMemo(
    () => dn.from([unbonding?.microcredits ?? 0n, 6]),
    [unbonding]
  )

  const canUnstaking = useMemo(
    () => dn.gt(unbondingCreditsDN, 0),
    [unbondingCreditsDN]
  )

  const claimable = useMemo(
    () =>
      dn.gt(unbondingCreditsDN, 0) &&
      Number(unbonding?.height ?? 0n) > latestBlockHeight,
    [unbondingCreditsDN, unbonding, latestBlockHeight]
  )

  const { mutate, isPending } = useCreditsClaim()

  const handleClaim = useCallback(async () => {
    if (!address || !unbonding || unbonding.microcredits <= 0n) return

    const fee = 250_000 // TODO

    mutate({ staker: address, fee })
  }, [address, mutate, unbonding])

  return (
    <section>
      <div className="container">
        <div className="pt-4 py-8 grid grid-cols-1 lg:grid-cols-6 items-start justify-between gap-8 lg:gap-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between flex-1 col-span-1 lg:col-span-3 gap-4 lg:gap-0">
            <div>
              <h6 className="text-sm font-medium text-muted-foreground flex items-center mb-3">
                Staked
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="w-4 h-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The amount of your Credits that are bonded to validators
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h6>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-semibold">
                    {dn.format(bondedCreditsDN, {
                      digits: 6,
                      locale: 'en',
                    })}
                  </span>{' '}
                  <span className="text-muted-foreground">Credits</span>
                </div>
              </div>
            </div>
            <div className="space-x-6 flex items-center">
              <BondDialog
                validator={bondState?.validator as AleoAddress}
                step={bondState ? 2 : 0}
              >
                <Button variant="secondary">Stake</Button>
              </BondDialog>
              <UnbondDialog>
                <Button variant="secondary">Unstake</Button>
              </UnbondDialog>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-px w-fit">
                <Button
                  className="rounded-full border-muted-foreground border-none"
                  variant="outline"
                  asChild
                >
                  <Link href="/liquid-staking">
                    <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                      Liquid
                    </span>
                    &nbsp;
                    <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                      Staking
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-3 lg:ml-20 lg:pl-20 border-none lg:border-l">
            <div className="flex items-center justify-between">
              <div>
                <h6 className="text-sm font-medium text-muted-foreground flex items-center mb-3">
                  Unstaking
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelpIcon className="w-4 h-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          The amount of your Credits that are currently in the
                          unbonding period
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h6>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-2xl font-semibold">
                      {dn.format(unbondingCreditsDN, {
                        digits: 6,
                        locale: 'en',
                      })}
                    </span>{' '}
                    <span className="text-muted-foreground">Credits</span>
                  </div>
                </div>
              </div>
              <div className="space-x-4">
                <WalletConnectionChecker
                  className="min-w-24"
                  variant="secondary"
                  label="Claim"
                >
                  <Button
                    className="min-w-24"
                    variant="secondary"
                    disabled={!claimable || isPending}
                    onClick={handleClaim}
                  >
                    {isPending && (
                      <Loader2Icon
                        className={cn('mr-2 h-4 w-4 animate-spin')}
                      />
                    )}
                    {isPending ? 'Waiting for wallet confirmation' : 'Claim'}
                  </Button>
                </WalletConnectionChecker>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mt-1">
              <span>Claim Height: {dn.format(dn.from(618409n))}</span>{' '}
            </div>

            {!dn.eq(unbondingCreditsDN, 0) && (
              <div className="text-sm text-muted-foreground mt-1">
                <span>
                  Claim Height:{' '}
                  {unbonding ? dn.format(dn.from(unbonding.height)) : '-'}
                </span>{' '}
                {/* <span>(ETA. 2024-12-31 12:30:00)</span> */}
              </div>
            )}
          </div>
        </div>

        <ValidatorInfo />

        {/* {!dn.eq(unbondingCreditsDN, 0) ? <ValidatorInfo /> : <Separator />} */}
      </div>
    </section>
  )
}

'use client'

import * as dn from 'dnum'
import { CircleHelpIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { BondDialog } from '~/components/bond-dialog'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
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
import { useNetworkClientStore } from '~/stores/network-client'
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

  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  const [open, setOpen] = useState(false)
  const [validator, setValidator] = useState<AleoAddress>()
  const [step, setStep] = useState<number>()

  const openStakeDialog = useCallback(async () => {
    if (bondState) {
      const toastId = toast.loading('Loading...', { closeButton: false })

      try {
        const unbondingState = await creditsProgram.getUnbonding(
          bondState.validator as AleoAddress
        )

        toast.dismiss(toastId)
        if (unbondingState) {
          toast.warning(
            'The validator currently is in the unbonding state so that you cannot stake to it.'
          )

          return
        }

        setValidator(bondState.validator as AleoAddress)
        setStep(2)
        setOpen(true)
      } catch (error) {
        toast.dismiss(toastId)

        toast.warning('Fetch data error')
      }
    }

    setOpen(true)
  }, [bondState, creditsProgram])

  const onClose = useCallback(() => setOpen(false), [])

  return (
    <section>
      <div className="container">
        <div className="pt-4 py-8 grid grid-cols-1 lg:grid-cols-6 items-start justify-between gap-8 lg:gap-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between flex-1 col-span-1 lg:col-span-3 gap-4 lg:gap-0">
            <div className="w-full lg:w-auto">
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
            <div className="space-x-6 flex items-center w-full lg:w-auto justify-between">
              <Button variant="secondary" onClick={openStakeDialog}>
                Stake
              </Button>
              <UnbondDialog>
                <Button variant="secondary">Unstake</Button>
              </UnbondDialog>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-px w-fit">
                <Button
                  className="rounded-full border-muted-foreground border-none"
                  variant="outline"
                  asChild
                >
                  <Link href="/liquid-staking" target="_blank" rel="noreferrer">
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

        {!dn.eq(unbondingCreditsDN, 0) ? <ValidatorInfo /> : <Separator />}
      </div>
      {open && (
        <BondDialog
          open={open}
          validator={validator}
          step={step}
          onClose={onClose}
        />
      )}
    </section>
  )
}

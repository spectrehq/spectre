'use client'

import * as dn from 'dnum'
import { CircleHelpIcon } from 'lucide-react'
import { useMemo } from 'react'
import { GradientsAvatar } from '~/components/gradients-avatar'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { useStakingAPR } from '~/hooks/use-staking-apr'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { shortenAddress } from '~/utils'

export function LiquidStakingOverview() {
  const { address } = useAccount()

  const { data: balance, isLoading: isLoadingBalance } = useBalance(address)
  const { data: stCreditsBalance, isLoading: isLoadingStCreditsBalance } =
    useStCreditsBalance(address)

  const balanceDN = useMemo(() => dn.from([balance ?? 0n, 6]), [balance])
  const stCreditsBalanceDN = useMemo(
    () => dn.from([stCreditsBalance ?? 0n, 6]),
    [stCreditsBalance]
  )

  const { data: apr, isLoading: isLoadingAPR } = useStakingAPR()
  const aprFormatted = useMemo(
    () => dn.format([apr ?? 0n, 2], { digits: 2, trailingZeros: true }),
    [apr]
  )

  return (
    <div className="p-6 pb-9 max-w-lg mx-auto rounded-t-xl bg-gradient-to-r from-[#28144A] to-[#512A96] -mb-3">
      <div className="grid grid-cols-2 items-center">
        <div>
          <div className="font-medium text-xs sm:text-sm">
            Available to stake
          </div>
          <div className="mt-1 font-semibold text-lg sm:text-xl">
            {isLoadingBalance ? (
              <Skeleton className="w-48">&nbsp;</Skeleton>
            ) : (
              <span>{dn.format(balanceDN, 6)} Credits</span>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          {address && (
            <Button variant="secondary" size="sm">
              <span className="block lg:hidden mr-1">
                {shortenAddress(address, 3)}
              </span>
              <span className="hidden lg:block mr-1">
                {shortenAddress(address)}
              </span>
              <GradientsAvatar
                id="liquid-staking-overview"
                text={address}
                size={20}
              />
            </Button>
          )}
        </div>
      </div>
      <Separator className="my-6 bg-muted-foreground/50" />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="font-medium text-xs sm:text-sm">Staked amount</div>
          <div className="mt-1 font-semibold text-lg sm:text-xl">
            {isLoadingStCreditsBalance ? (
              <Skeleton className="w-40">&nbsp;</Skeleton>
            ) : (
              <span>{dn.format(stCreditsBalanceDN, 6)} stCredits</span>
            )}
          </div>
        </div>
        <div>
          <div className="font-medium text-xs sm:text-sm flex items-center">
            <span>APR</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelpIcon className="w-3 h-3 lg:w-4 lg:h-4 ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Moving average of APR for 7 days period</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-1 font-semibold text-lg sm:text-xl">
            {isLoadingAPR ? (
              <Skeleton className="w-32">&nbsp;</Skeleton>
            ) : (
              <span>{aprFormatted}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

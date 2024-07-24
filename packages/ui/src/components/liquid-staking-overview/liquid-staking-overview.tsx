'use client'

import * as dn from 'dnum'
import { CircleHelpIcon } from 'lucide-react'
import { useMemo } from 'react'
import { GradientsAvatar } from '~/components/gradients-avatar'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { shortenAddress } from '~/utils'

export function LiquidStakingOverview() {
  const { address } = useAccount()

  const { data: balance } = useBalance(address)
  const { data: stCreditsBalance } = useStCreditsBalance(address)

  const balanceDN = useMemo(() => dn.from([balance ?? 0n, 6]), [balance])
  const stCreditsBalanceDN = useMemo(
    () => dn.from([stCreditsBalance ?? 0n, 6]),
    [stCreditsBalance]
  )

  return (
    <div className="p-6 pb-9 max-w-lg mx-auto rounded-t-xl bg-gradient-to-r from-[#28144A] to-[#512A96] -mb-3">
      <div className="grid grid-cols-2 items-center">
        <div>
          <div className="font-medium text-lg/6 sm:text-sm/6">
            Available to stake
          </div>
          <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
            {dn.format(balanceDN, { digits: 2, trailingZeros: true })} Credits
          </div>
        </div>
        <div className="flex justify-end">
          {address && (
            <Button variant="secondary" size="sm">
              <span className="mr-1">{shortenAddress(address)}</span>
              <GradientsAvatar text={address} size={20} />
            </Button>
          )}
        </div>
      </div>
      <Separator className="my-6 bg-muted-foreground/50" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="font-medium text-lg/6 sm:text-sm/6">
            Staked amount
          </div>
          <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
            {dn.format(stCreditsBalanceDN, {
              digits: 2,
              trailingZeros: true,
            })}{' '}
            stCredits
          </div>
        </div>
        <div>
          <div className="font-medium text-lg/6 sm:text-sm/6 flex items-center">
            <span>APR</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelpIcon className="w-4 h-4 ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Moving average of APR for 7 days period</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
            13.23%
          </div>
        </div>
      </div>
    </div>
  )
}

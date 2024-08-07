'use client'

import { GradientsAvatar } from '~/components/gradients-avatar'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useAccount } from '~/hooks/use-account'
import { shortenAddress } from '~/utils'
import { LockedAmount } from './locked-amount'
import { UserPoints } from './user-points'
import { AccumulatedPoints } from './accumulated-points'

export function PointsOverview() {
  const { address } = useAccount()

  return (
    <div className="max-w-lg mx-auto p-6 pb-9 rounded-t-xl bg-gradient-to-r from-[#28144A] to-[#512A96] -mb-3">
      <div className="grid grid-cols-2 items-center">
        <LockedAmount />
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
      <div className="grid grid-cols-2 items-center">
        <UserPoints />
        <AccumulatedPoints />
      </div>
    </div>
  )
}

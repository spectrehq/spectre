'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { Skeleton } from '~/components/ui/skeleton'
import { useAccount } from '~/hooks/use-account'
import { usePointsState } from '~/hooks/use-points-state'

export function LockedAmount() {
  const t = useTranslations('PointsOverview.LockedPoints')

  const { address } = useAccount()
  const { data, isLoading } = usePointsState(address)

  return (
    <div>
      <div className="font-medium text-xs sm:text-sm">{t('title')}</div>
      <div className="mt-1 font-semibold text-lg sm:text-xl">
        {isLoading ? (
          <Skeleton className="w-48">&nbsp;</Skeleton>
        ) : (
          <span>{dn.format([data?.stcredits ?? 0n, 6], 6)} stCredits</span>
        )}
      </div>
    </div>
  )
}

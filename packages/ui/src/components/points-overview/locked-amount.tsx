'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { Skeleton } from '~/components/ui/skeleton'

export function LockedAmount() {
  const t = useTranslations('PointsOverview.LockedPoints')
  const isLoading = false

  return (
    <div>
      <div className="font-medium text-xs sm:text-sm">{t('title')}</div>
      <div className="mt-1 font-semibold text-lg sm:text-xl">
        {isLoading ? (
          <Skeleton className="w-48">&nbsp;</Skeleton>
        ) : (
          <span>{dn.format([100_000_000n, 6], 6)} stCredits</span>
        )}
      </div>
    </div>
  )
}

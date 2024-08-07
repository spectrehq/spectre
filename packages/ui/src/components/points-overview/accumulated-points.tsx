'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { Skeleton } from '~/components/ui/skeleton'

export function AccumulatedPoints() {
  const t = useTranslations('PointsOverview.AccumulatedPoints')
  const isLoading = false

  return (
    <div>
      <div className="font-medium text-xs sm:text-sm">{t('title')}</div>
      <div className="mt-1 font-semibold text-lg sm:text-xl">
        {isLoading ? (
          <Skeleton className="w-40">&nbsp;</Skeleton>
        ) : (
          <span>{dn.format([987654321n, 6], 0)}</span>
        )}
      </div>
    </div>
  )
}

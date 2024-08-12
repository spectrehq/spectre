'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { usePointsStats } from '~/hooks/use-points-stats'
import { Skeleton } from '~/components/ui/skeleton'

export function TotalLocked() {
  const t = useTranslations('PointsStatistics.TotalLocked')

  const { data, isLoading } = usePointsStats()

  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{t('title')}</span>
      <div>
        {isLoading ? (
          <Skeleton className="w-24">&nbsp;</Skeleton>
        ) : (
          <span>
            {data && data.stcredits > 0n
              ? dn.format([data.stcredits, 6], 6)
              : '-'}{' '}
            stCredits
          </span>
        )}
      </div>
    </div>
  )
}

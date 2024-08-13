'use client'

import * as dn from 'dnum'
import { CircleHelpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { usePointsStats } from '~/hooks/use-points-stats'

export function TotalPoints() {
  const t = useTranslations('PointsStatistics.TotalPoints')

  const { data, isLoading } = usePointsStats()

  const pointsFormatted = useMemo(
    () => dn.format([data?.points ?? 0n, 6], 0),
    [data]
  )

  return (
    <div className="flex justify-between items-center">
      <span className="flex items-center text-muted-foreground">
        <span>{t('title')}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelpIcon className="w-3 h-3 lg:w-3.5 lg:h-3.5 ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('description')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <div>
        {isLoading ? (
          <Skeleton className="w-28">&nbsp;</Skeleton>
        ) : (
          <span>{pointsFormatted}</span>
        )}
      </div>
    </div>
  )
}

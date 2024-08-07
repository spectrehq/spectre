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

export function TotalPoints() {
  const t = useTranslations('PointsStatistics.TotalPoints')
  const isLoading = false

  const pointsFormatted = useMemo(() => dn.format([1000n, 6], 6), [])

  return (
    <div className="flex justify-between items-center">
      <span className="flex items-center text-muted-foreground">
        <span>{t('title')}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelpIcon className="w-3 h-3 lg:w-4 lg:h-4 ml-1" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('description')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <div>
        {isLoading ? (
          <Skeleton className="w-24">&nbsp;</Skeleton>
        ) : (
          <span>{pointsFormatted}</span>
        )}
      </div>
    </div>
  )
}

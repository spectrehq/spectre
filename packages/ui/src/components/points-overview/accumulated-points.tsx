'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { Skeleton } from '~/components/ui/skeleton'
import { CircleHelpIcon } from 'lucide-react'

export function AccumulatedPoints() {
  const t = useTranslations('PointsOverview.AccumulatedPoints')
  const isLoading = false

  return (
    <div>
      <div className="flex items-center font-medium text-xs sm:text-sm">
        <span>{t('title')}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelpIcon className="w-3 h-3 lg:w-3.5 lg:h-3.5 ml-1" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{t('description')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
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

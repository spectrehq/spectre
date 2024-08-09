'use client'

import * as dn from 'dnum'
import { CircleHelpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export function UserPoints() {
  const t = useTranslations('PointsOverview.UserPoints')
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
            <TooltipContent>
              <p>{t('description')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-1 font-semibold text-lg sm:text-xl">
        {isLoading ? (
          <Skeleton className="w-40">&nbsp;</Skeleton>
        ) : (
          <span>{dn.format([123456789n, 6], 0)}</span>
        )}
      </div>
    </div>
  )
}

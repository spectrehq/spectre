'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { useStakingAPR } from '~/hooks/use-staking-apr'
import { useStCreditsTotalPooled } from '~/hooks/use-stcredits-total-pooled'

export function AleoStakingStatistics() {
  const t = useTranslations('AleoStakingStatistics')

  const { data: apr } = useStakingAPR()
  const aprFormatted = useMemo(
    () => dn.format([apr ?? 0n, 2], { digits: 2, trailingZeros: true }),
    [apr]
  )

  const { data: totalPooled, isLoading: isLoadingTotalPooled } =
    useStCreditsTotalPooled()
  const totalStakedFormatted = useMemo(
    () => dn.format([totalPooled ?? 0n, 6], { digits: 6 }),
    [totalPooled]
  )

  return (
    <div className="max-w-lg mx-auto mt-12">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-6">
        {t('title')}
      </h4>
      <div className="bg-primary-foreground rounded-xl p-6">
        <ul className="grid gap-3 text-sm">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Annual percentage rate
            </span>
            <span>{aprFormatted}%</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Total staked</span>
            <span>
              {isLoadingTotalPooled ? (
                <Skeleton className="w-40 h-5" />
              ) : (
                `${totalStakedFormatted} Credits`
              )}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">stCredits market cap</span>
            {/* TODO */}
            <span>-</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

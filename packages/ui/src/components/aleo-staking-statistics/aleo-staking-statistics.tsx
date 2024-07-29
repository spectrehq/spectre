'use client'

import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useStakingAPR } from '~/hooks/use-staking-apr'
import { useStCreditsState } from '~/hooks/use-stcredits-state'
import { useStCreditsTotalSupply } from '~/hooks/use-stcredits-total-supply'

export function AleoStakingStatistics() {
  const t = useTranslations('AleoStakingStatistics')

  const { data: apr } = useStakingAPR()
  const aprFormatted = useMemo(
    () => dn.format([apr ?? 0n, 2], { digits: 2, trailingZeros: true }),
    [apr]
  )

  const { data: state } = useStCreditsState()
  const totalStakedFormatted = useMemo(
    () => dn.format([state?.bonded ?? 0n, 6], { digits: 6 }),
    [state]
  )

  const { data: totalSupply } = useStCreditsTotalSupply()
  const totalSupplyFormatted = useMemo(
    () => dn.format([totalSupply ?? 0n, 6], { digits: 6 }),
    [totalSupply]
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
            <span>{totalStakedFormatted} Credits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">stCredits market cap</span>
            <span>
              {totalSupply && dn.gt(totalSupplyFormatted, 0)
                ? `${totalSupplyFormatted}`
                : '-'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

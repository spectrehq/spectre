'use client'

import { useTranslations } from 'next-intl'

export function TotalLocked() {
  const t = useTranslations('PointsStatistics.TotalLocked')

  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{t('title')}</span>
      <span>- stCredits</span>
    </div>
  )
}

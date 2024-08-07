import { useTranslations } from 'next-intl'
import { TotalLocked } from './total-locked'
import { TotalPoints } from './total-points'

export function PointsStatistics() {
  const t = useTranslations('PointsStatistics')

  return (
    <div className="max-w-lg mx-auto mt-12">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-6">
        {t('title')}
      </h4>
      <div className="bg-primary-foreground rounded-xl p-6">
        <ul className="grid gap-3 text-sm">
          <li>
            <TotalLocked />
          </li>
          <li>
            <TotalPoints />
          </li>
        </ul>
      </div>
    </div>
  )
}

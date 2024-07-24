import { useTranslations } from 'next-intl'

export function AleoStakingStatistics() {
  const t = useTranslations('AleoStakingStatistics')

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
            <span>12.68%</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Total staked</span>
            <span>100.123456 Credits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Stakers</span>
            <span>10,000</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">stCredits market cap</span>
            <span>-</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

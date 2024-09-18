import { useTranslations } from 'next-intl'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { AleoStakingStatistics } from '~/components/aleo-staking-statistics'
import { LiquidStakingOverview } from '~/components/liquid-staking-overview'
import { LiquidStakingTabs } from '~/components/liquid-staking-tabs'
import { Button } from '~/components/ui/button'

export default function WithdrawalsLayout({ children }: PropsWithChildren) {
  const t = useTranslations('LiquidStakingPage')

  return (
    <>
      <section className="disable-input">
        <div className="container py-16">
          <div className="text-center mb-8">
            <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight mb-1">
              {t('title')}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('description')}{' '}
              <Button
                asChild
                variant="link"
                className="p-0 h-auto text-sky-400"
              >
                <Link
                  href="https://docs.spectre.guru/aleostaking/stcredits"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more
                </Link>
              </Button>
            </p>
          </div>
          <LiquidStakingTabs />
          <div className="max-w-lg mx-auto">
            <LiquidStakingOverview />
          </div>
          {children}
          <AleoStakingStatistics />
        </div>
      </section>
    </>
  )
}

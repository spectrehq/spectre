import { useTranslations } from 'next-intl'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { PointsOverview } from '~/components/points-overview'
import { PointsStatistics } from '~/components/points-statistics'
import { PointsTabs } from '~/components/points-tabs'
import { Button } from '~/components/ui/button'

export default function PointsLayout({ children }: PropsWithChildren) {
  const t = useTranslations('PointsPage')

  return (
    <>
      <section>
        <div className="container py-6">
          <div className="text-center">
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
                  href="https://docs.spectre.guru/spectre/points"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more
                </Link>
              </Button>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <PointsTabs />
        </div>
      </section>
      <section>
        <div className="container">
          <PointsOverview />
          {children}
        </div>
      </section>

      <section>
        <div className="container">
          <PointsStatistics />
        </div>
      </section>
    </>
  )
}

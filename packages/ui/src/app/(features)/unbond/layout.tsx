import { useTranslations } from 'next-intl'
import type { PropsWithChildren } from 'react'
import { UnbondTabs } from '~/components/unbond-tabs'

export default function UnbondLayout({ children }: PropsWithChildren) {
  const t = useTranslations('UnbondPage')

  return (
    <>
      <section>
        <div className="container py-16">
          <div className="text-center mb-8">
            <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
              {t('title')}
            </h3>
            <p className="text-muted-foreground text-sm" />
          </div>
          <UnbondTabs />
          {children}
        </div>
      </section>
    </>
  )
}

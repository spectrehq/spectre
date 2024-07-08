import { useTranslations } from 'next-intl'
import type { PropsWithChildren } from 'react'
import { WithdrawalsTabs } from '~/components/withdrawals-tabs'

export default function WithdrawalsLayout({ children }: PropsWithChildren) {
  const t = useTranslations('WithdrawalsPage')

  return (
    <>
      <section>
        <div className="container py-16">
          <div className="text-center mb-8">
            <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
              {t('title')}
            </h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
          </div>
          <WithdrawalsTabs />
          {children}
        </div>
      </section>
    </>
  )
}

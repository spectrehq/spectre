import { useTranslations } from 'next-intl'
import { StakeWidget } from '~/components/stake-widget'

export default function StakePage() {
  const t = useTranslations('StakePage')

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
          <StakeWidget />
        </div>
      </section>
    </>
  )
}

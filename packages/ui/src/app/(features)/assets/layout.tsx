import { useTranslations } from 'next-intl'
import { AssetsOverview } from '~/components/assets-overview'
import { AssetsTabs } from '~/components/assets-tabs'

export default function AssetsLayout() {
  const t = useTranslations('AssetsPage')

  return (
    <div className="py-16">
      <section>
        <div className="container mb-8">
          <div className="text-center">
            <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight mb-1">
              {t('title')}
            </h3>
            <p className="text-muted-foreground text-sm">{t('description')}</p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <AssetsTabs />
        </div>
      </section>
      <section>
        <div className="container">
          <AssetsOverview />
        </div>
      </section>
    </div>
  )
}

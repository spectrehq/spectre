import { useTranslations } from 'next-intl'
import { MyDelegation } from '~/components/my-delegation'
import { ValidatorList } from '~/components/validator-list'

export default function ValidatorsPage() {
  const t = useTranslations('ValidatorsPage')

  return (
    <>
      <MyDelegation />
      <section>
        <div className="container">
          <div className="mb-6">
            <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
              {t('title')}
            </h3>
          </div>
          <ValidatorList />
        </div>
      </section>
    </>
  )
}

import { useTranslations } from 'next-intl'
import { MyBalance } from '~/components/my-balance'
import { MyValidator } from '~/components/my-validator'
// import { MyDelegation } from '~/components/my-delegation'
import { ValidatorList } from '~/components/validator-list'
import { ValidatorsOverview } from '~/components/validators-overview'

export default function ValidatorsPage() {
  const t = useTranslations('ValidatorsPage')

  return (
    <>
      <MyBalance />
      <MyValidator />
      <ValidatorsOverview />
      {/* <MyDelegation /> */}
      <section>
        <div className="container mt-20">
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

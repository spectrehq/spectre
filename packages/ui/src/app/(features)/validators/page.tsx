import { useTranslations } from 'next-intl'
import { Button } from '~/components/ui/button'
import { ValidatorList } from '~/components/validator-list'

export default function ValidatorsPage() {
  const t = useTranslations('ValidatorsPage')

  return (
    <>
      <section>
        <div className="container py-12">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Credits Balance
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="flex justify-between">
                  <div className="text-2xl font-bold">13,259.00</div>
                  <Button>Stake</Button>
                </div>
                {/* <p className="text-xs text-muted-foreground" /> */}
              </div>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Staking Credits
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="flex justify-between">
                  <div className="text-2xl font-bold">10,280.00</div>
                  <Button>Withdraw</Button>
                </div>
                {/* <p className="text-xs text-muted-foreground" /> */}
              </div>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Withdrawing Credits
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="flex justify-between">
                  <div className="text-2xl font-bold">380.00</div>
                  <Button>Claim</Button>
                </div>
                {/* <p className="text-xs text-muted-foreground" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
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

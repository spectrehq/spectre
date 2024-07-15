'use client'

import * as dn from 'dnum'
import { useMemo } from 'react'
import { BondDialog } from '~/components/bond-dialog'
import { CreditsClaimDialog } from '~/components/credits-claim-dialog'
import { UnbondDialog } from '~/components/unbond-dialog'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { useBondState } from '~/hooks/use-bond-state'
import { useCreditsUnbonding } from '~/hooks/use-credits-unbonding'
import { Button } from '~/components/ui/button'

export function MyDelegation() {
  const { address } = useAccount()

  const { data: balance } = useBalance(address)
  const balanceDN = useMemo(() => dn.from([balance ?? 0n, 6]), [balance])

  const { data: bondState } = useBondState(address)
  const bondedCreditsDN = useMemo(
    () => dn.from([bondState?.microcredits ?? 0n, 6]),
    [bondState]
  )

  const { data: unbonding } = useCreditsUnbonding(address)
  const unbondingCreditsDN = useMemo(
    () => dn.from([unbonding?.microcredits ?? 0n, 6]),
    [unbonding]
  )

  return (
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
                <div className="text-2xl font-bold">
                  {dn.format(balanceDN, { digits: 2, trailingZeros: true })}
                </div>
                <BondDialog>
                  <Button>Stake</Button>
                </BondDialog>
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
                <div className="text-2xl font-bold">
                  {dn.format(bondedCreditsDN, {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </div>
                <UnbondDialog />
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
                <div className="text-2xl font-bold">
                  {dn.format(unbondingCreditsDN, {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </div>
                <CreditsClaimDialog />
              </div>
              {/* <p className="text-xs text-muted-foreground" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

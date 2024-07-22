'use client'

import * as dn from 'dnum'
import { Separator } from '~/components/ui/separator'
import { DepositDialog } from '~/components/deposit-dialog'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useBalance } from '~/hooks/use-balance'
import { useAccount } from '~/hooks/use-account'
import { usePrivateBalance } from '~/hooks/use-private-balance'

export function MyBalance() {
  const { address } = useAccount()
  const { data } = useBalance(address)
  const { data: privateBalance } = usePrivateBalance()

  return (
    <section>
      <div className="container pt-12">
        <div className="pt-8 pb-5 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-muted-foreground">
              💰 Total Credits
            </h4>
            <div className="">
              <span className="text-2xl font-semibold">
                {dn.format([(data ?? 0n) + (privateBalance ?? 0n), 6], {
                  digits: 6,
                  locale: 'en',
                })}
              </span>{' '}
              <span className="text-muted-foreground">Credits</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="py-5">
          <div>
            <h4 className="text-lg font-medium text-muted-foreground">
              Balance
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-semibold">
                    {dn.format([data ?? 0n, 6], {
                      digits: 6,
                      locale: 'en',
                    })}
                  </span>{' '}
                  <span className="text-muted-foreground">Public Credits</span>
                </div>

                <div>
                  <span className="text-2xl font-semibold">
                    {dn.format([privateBalance ?? 0n, 6], {
                      digits: 6,
                      locale: 'en',
                    })}
                  </span>{' '}
                  <span className="text-muted-foreground">Private Credits</span>
                </div>
              </div>
              <div>
                <WalletConnectionChecker variant="outline" label="Deposit">
                  <DepositDialog />
                </WalletConnectionChecker>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />
      </div>
    </section>
  )
}

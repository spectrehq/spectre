'use client'

import * as dn from 'dnum'
import { formatDistanceToNow } from 'date-fns'
import { Separator } from '~/components/ui/separator'
import { useCommittee } from '~/hooks/use-committee'
import { useLatestBlock } from '~/hooks/use-latest-block'

export function ValidatorsOverview() {
  const { data: block } = useLatestBlock()
  const { data: committee } = useCommittee()

  return (
    <section>
      <div className="container">
        <div className="mt-20 my-4">
          <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
            Network Status
          </h3>
        </div>
        <div className="py-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0">
          <div>
            <h4 className="text-lg font-medium text-muted-foreground">Block</h4>
            <div className="">
              <span className="text-2xl font-semibold">
                {dn.format(
                  dn.from(
                    BigInt(JSON.stringify(block?.header.metadata.height) || 0)
                  )
                )}
              </span>{' '}
              {block && (
                <span className="text-muted-foreground">
                  (
                  {formatDistanceToNow(block.header.metadata.timestamp * 1000, {
                    addSuffix: true,
                  })}
                  )
                </span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-muted-foreground">
              Total Staked
            </h4>
            <div className="">
              <span className="text-2xl font-semibold">
                {dn.format([BigInt(committee?.totalStake ?? 0), 6], {
                  digits: 6,
                })}
              </span>
              &nbsp;
              <span className="text-muted-foreground">Credits</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-muted-foreground">
              Network Validators
            </h4>
            <div className="">
              <span className="text-2xl font-semibold">
                {committee?.validators.length}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />
      </div>
    </section>
  )
}

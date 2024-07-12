'use client'

import type { ColumnDef } from '@tanstack/react-table'
import * as dn from 'dnum'
// import { Badge } from '~/components/ui/badge'
import { Skeleton } from '~/components/ui/skeleton'
import type { Validator } from '~/hooks/use-committee'
import type { ValidatorFromAleo123 } from '~/hooks/use-validators'
import { shortenAddress } from '~/utils'
import { GradientsAvatar } from '../gradients-avatar'
// import { TrendChart } from './trend-chart'

export const columns: ColumnDef<Validator & ValidatorFromAleo123>[] = [
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ getValue }) => (
      <div className="flex items-center space-x-2">
        <GradientsAvatar text={getValue<string>()} size={32} />
        <span>{shortenAddress(getValue<string>())}</span>
      </div>
    ),
  },
  {
    accessorKey: 'staked',
    header: () => <div className="text-end">Stake</div>,
    cell: ({ getValue }) => {
      const staked = getValue<number | undefined | null>()

      return (
        <div className="flex justify-end">
          {staked === null || staked === undefined ? (
            <Skeleton className="w-40 h-5" />
          ) : (
            <span>
              {dn.format([BigInt(getValue<number>()), 6], {
                digits: 2,
                trailingZeros: true,
              })}
            </span>
          )}
        </div>
      )
    },
  },

  {
    accessorKey: 'profit_total',
    header: () => <div className="text-end">Total Earnings</div>,
    cell: ({ getValue }) => (
      <div className="text-end">
        {dn.format([BigInt(getValue<number>() ?? 0), 6], {
          digits: 2,
          trailingZeros: true,
        })}
      </div>
    ),
  },
  // {
  //   accessorKey: 'trend',
  //   header: () => <div>Daily Earnings Change</div>,
  //   cell: ({ getValue }) => <TrendChart data={getValue<number[]>()} />,
  // },
  // {
  //   accessorKey: 'apr',
  //   header: () => <div className="text-center">APR</div>,
  //   cell: ({ getValue }) => {
  //     return (
  //       <div className="text-center text-xs font-semibold">
  //         {dn.format(dn.from((getValue<number>() ?? 0) * 100), { digits: 2 })}%
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: 'commission',
    header: () => <div className="text-end">Commission</div>,
    cell: ({ getValue }) => {
      const commission = getValue<number | undefined>()

      return (
        <div className="flex justify-end items-center font-semibold">
          {commission === undefined || commission === null ? (
            <Skeleton className="w-10 h-5" />
          ) : (
            <span>{dn.format(dn.from(commission), { digits: 2 })}%</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'isOpen',
    header: () => <div className="text-center">Bonding State</div>,
    cell: ({ getValue }) => {
      const isOpen = getValue<boolean | undefined | null>()

      return (
        <div className="text-xs font-semibold flex justify-center items-center">
          {isOpen === null || isOpen === undefined ? (
            <Skeleton className="w-12 h-5" />
          ) : (
            <span>{isOpen ? 'OPEN' : 'CLOSED'}</span>
          )}
        </div>
      )
    },
  },
]

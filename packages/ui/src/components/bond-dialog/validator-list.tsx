'use client'

import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as dn from 'dnum'
import { useCallback } from 'react'
import { Badge } from '~/components/ui/badge'
import { useStepper } from '~/components/ui/stepper'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { type Validator, useCommittee } from '~/hooks/use-committee'
import type { AleoAddress } from '~/types'
import { shortenAddress } from '~/utils'

const columnHelper = createColumnHelper<Validator>()

const columns = [
  columnHelper.accessor('address', {
    header: 'Address',
    cell: ({ getValue }) => shortenAddress(getValue()),
  }),

  columnHelper.accessor('staked', {
    header: () => <div className="text-end">Stake</div>,
    cell: ({ getValue }) => (
      <div className="text-end">
        {dn.format([BigInt(getValue<number>()), 6], {
          digits: 2,
          trailingZeros: true,
        })}
      </div>
    ),
  }),

  columnHelper.accessor('commission', {
    header: () => <div className="text-end">Commission</div>,
    cell: ({ getValue }) => {
      const commission = getValue<number>()

      return (
        <div className="text-end">
          <Badge
            variant={
              commission > 20
                ? 'destructive'
                : commission > 10
                  ? 'warning'
                  : 'success'
            }
          >
            {dn.format(dn.from(getValue<number>() ?? 0), { digits: 2 })}%
          </Badge>
        </div>
      )
    },
  }),
]

export interface ValidatorListProps {
  onSelect: (address: AleoAddress) => void
}

export function ValidatorList({ onSelect }: ValidatorListProps) {
  const { data } = useCommittee()

  const table = useReactTable({
    data: data?.validators ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { nextStep } = useStepper()

  const handleNextStep = useCallback(
    (address: AleoAddress) => {
      onSelect(address)
      nextStep()
    },
    [onSelect, nextStep]
  )

  return (
    <div className="max-h-96 overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => handleNextStep(row.original.address)}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

'use client'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as dn from 'dnum'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { GradientsAvatar } from '~/components/gradients-avatar'
import { Skeleton } from '~/components/ui/skeleton'
import { useStepper } from '~/components/ui/stepper'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useCommittee, type Validator } from '~/hooks/use-committee'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'
import { shortenAddress } from '~/utils'

const columnHelper = createColumnHelper<Validator>()

const columns = [
  columnHelper.accessor('address', {
    header: 'Address',
    cell: ({ getValue }) => (
      <div className="flex items-center space-x-2">
        <GradientsAvatar text={getValue<string>()} size={32} />
        <span>{shortenAddress(getValue<string>())}</span>
      </div>
    ),
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
        <div className="flex justify-end items-center font-semibold">
          {commission === undefined || commission === null ? (
            <Skeleton className="w-10 h-5" />
          ) : (
            <span>{dn.format(dn.from(commission), { digits: 2 })}%</span>
          )}
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
    data: data?.validators.filter((validator) => validator.isOpen) ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  const { nextStep } = useStepper()

  const handleNextStep = useCallback(
    async (address: AleoAddress) => {
      const toastId = toast.loading('Loading...', { closeButton: false })

      try {
        const unbondingState = await creditsProgram.getUnbonding(address)

        toast.dismiss(toastId)

        if (unbondingState) {
          toast.warning(
            'The validator currently is in the unbonding state so that you cannot stake to it.'
          )
          return
        }

        onSelect(address)
        nextStep()
      } catch (e) {
        console.log(e)
        toast.dismiss(toastId)

        toast.warning('Fetch data error')
      }
    },
    [creditsProgram, onSelect, nextStep]
  )

  return (
    <div className="overflow-auto w-screen max-w-full md:max-w-4xl">
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

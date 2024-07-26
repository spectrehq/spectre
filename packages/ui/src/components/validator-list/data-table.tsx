'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { toast } from 'sonner'
import { BondDialog } from '~/components/bond-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useAccount } from '~/hooks/use-account'
import { useBondState } from '~/hooks/use-bond-state'
import type { Validator } from '~/hooks/use-committee'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const creditsProgram = useNetworkClientStore((store) => store.creditsProgram)

  const { address } = useAccount()

  const { data: bondState } = useBondState(address)

  const [validator, setValidator] = useState<AleoAddress>()
  const [open, setOpen] = useState(false)

  const handleRowClick = async (validator: Validator) => {
    if (
      validator.isOpen !== undefined &&
      validator.isOpen !== null &&
      !validator.isOpen
    ) {
      toast.warning('The validator is closed so that you cannot stake to it.')
      return
    }

    if (bondState && bondState.validator !== validator.address) {
      toast.warning(
        `You have staked to the validator ${bondState.validator}. If you want to stake to another validator, you must unstake from your current validator.`
      )
      return
    }

    const unbondingState = await creditsProgram.getUnbonding(validator.address)

    if (unbondingState) {
      toast.warning(
        'The validator currently is in the unbonding state so that you cannot stake to it.'
      )
      return
    }

    setValidator(validator.address)
    setOpen(true)
  }

  return (
    <div className="overflow-hidden rounded-xl border">
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
                className="cursor-pointer"
                onClick={() => handleRowClick(row.original as Validator)}
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

      <BondDialog
        open={open}
        step={1}
        validator={validator}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

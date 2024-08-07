'use client'

import { useMemo } from 'react'
import { useCommittee } from '~/hooks/use-committee'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useValidatorsFromAleo123 } from '~/hooks/use-validators'
import orderBy from 'lodash.orderby'
import { Input } from '~/components/ui/input'
import { SearchIcon } from 'lucide-react'

export function ValidatorList() {
  const { data: committee } = useCommittee()
  const { data: validatorsFromAleo123 } = useValidatorsFromAleo123()

  const data = useMemo(() => {
    if (committee && !validatorsFromAleo123)
      return orderBy(
        committee.validators,
        ['isOpen', 'staked'],
        ['desc', 'desc']
      )
    if (validatorsFromAleo123 && !committee)
      return orderBy(
        validatorsFromAleo123.validators,
        ['is_open', 'stake'],
        ['desc', 'desc']
      )

    if (committee && validatorsFromAleo123) {
      return orderBy(
        committee.validators,
        ['isOpen', 'staked'],
        ['desc', 'desc']
      ).map((validator) => ({
        ...validator,
        ...(validatorsFromAleo123.validators?.find(
          (v) => v.address === validator.address
        ) ?? {}),
      }))
    }
  }, [committee, validatorsFromAleo123])

  return (
    <>
      {/* <div className="mb-5 flex justify-between items-end">
        <div className="max-w-72 relative">
          <Input className="rounded-xl text-xl pl-10 py-2.5" />
          <SearchIcon className="w-5 h-5 absolute left-3 top-2.5" />
        </div>
      </div> */}
      {/* @ts-ignore */}
      <DataTable columns={columns} data={data ?? []} on />
    </>
  )
}

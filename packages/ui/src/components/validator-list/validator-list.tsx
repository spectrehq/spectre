'use client'

import { useMemo } from 'react'
import { useCommittee } from '~/hooks/use-committee'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useValidatorsFromAleo123 } from '~/hooks/use-validators'
import orderBy from 'lodash.orderby'

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
      {/* @ts-ignore */}
      <DataTable columns={columns} data={data ?? []} on />
    </>
  )
}

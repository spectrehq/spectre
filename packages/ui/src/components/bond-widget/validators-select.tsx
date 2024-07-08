'use client'

import { CommandLoading } from 'cmdk'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import * as dn from 'dnum'
import type { ControllerRenderProps } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { FormControl } from '~/components/ui/form'
import { useCommittee } from '~/hooks/use-committee'
import { cn } from '~/lib/utils'
import { shortenAddress } from '~/utils'

export interface ValidatorsSelectProps {
  field: ControllerRenderProps<
    {
      validator: string
      amount: number
    },
    'validator'
  >
}

export function ValidatorsSelect({ field }: ValidatorsSelectProps) {
  const { data, isLoading } = useCommittee()

  const validators = useMemo(
    () =>
      data?.validators.sort((a, b) => {
        if (a.staked > b.staked) return -1
        if (a.staked < b.staked) return 1
        return 0
      }) ?? [],
    [data]
  )

  const [open, setOpen] = useState(false)

  return (
    <>
      <FormControl>
        <Button
          variant="outline"
          role="combobox"
          size="xl"
          type="button"
          className={cn(
            'w-full px-3 justify-between',
            !field.value && 'text-muted-foreground'
          )}
          onClick={() => setOpen(true)}
        >
          <span className="truncate">
            {field.value
              ? validators.find(
                  (validator) => validator.address === field.value
                )?.address
              : 'Select validator'}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </FormControl>
      <CommandDialog open={open} onOpenChange={(open) => setOpen(open)}>
        <CommandInput placeholder="Search validator..." />
        <CommandList>
          <div className="flex pt-3 px-4 pb-1 text-muted text-xs font-semibold">
            <div className="w-5 mr-2" />
            <div className="flex-none text-muted-foreground">Validator</div>
            <div className="flex-1 text-muted-foreground text-end">Staked</div>
            <div className="flex-none min-w-32 text-muted-foreground text-end">
              Commission
            </div>
          </div>
          {isLoading ? (
            <CommandLoading className="min-h-40 flex justify-center items-center">
              Loading validators...
            </CommandLoading>
          ) : (
            <CommandEmpty>No validator found.</CommandEmpty>
          )}
          <CommandGroup>
            {validators
              .filter((validator) => validator.isOpen)
              .map((validator) => (
                <CommandItem
                  className="flex items-center"
                  value={validator.address}
                  key={validator.address}
                  onSelect={() => {
                    field.onChange(validator.address)
                    setOpen(false)
                  }}
                >
                  <div className="flex-none flex items-center">
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        validator.address === field.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {shortenAddress(validator.address)}
                  </div>
                  <div className="flex-1 text-end">
                    {dn.format([BigInt(validator.staked), 6], {
                      digits: 2,
                      trailingZeros: true,
                    })}
                  </div>
                  <div className="flex-none min-w-32 flex justify-end">
                    <Badge
                      variant={
                        validator.commission > 20 ? 'destructive' : 'success'
                      }
                    >
                      {dn.format(dn.from(validator.commission), {
                        digits: 2,
                      })}
                      %
                    </Badge>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

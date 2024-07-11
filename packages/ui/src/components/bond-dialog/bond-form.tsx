'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { Separator } from '~/components/ui/separator'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { useCreditsBond } from '~/hooks/use-credits-bond'
import { cn } from '~/lib/utils'
import type { AleoAddress } from '~/types'
import { useStepper } from '~/components/ui/stepper'

export interface BondFormProps {
  validator: AleoAddress
}

export function BondForm({ validator }: BondFormProps) {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  // credits balance
  const { data: balance } = useBalance(address)
  const balanceDN = useMemo(() => dn.from([balance ?? 0n, 6]), [balance])

  const formSchema = useMemo(
    () =>
      z.object({
        amount: z.coerce
          .number({
            required_error: tPrompts('Enter an amount'),
            invalid_type_error: tPrompts('Enter an amount'),
          })
          .gt(0, { message: tPrompts('Enter an amount') })
          .max(
            balance ? dn.toNumber(balanceDN) : Number.MAX_SAFE_INTEGER,
            tPrompts('Insufficient balance')
          )
          .default(0),
      }),
    [tPrompts, balance, balanceDN]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  })

  useEffect(() => {
    form.trigger()
  }, [form])

  const { mutate, isPending } = useCreditsBond()

  const handleBond = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!address) return

      const amount = dn.from(data.amount, 6)[0]

      mutate({
        validator: validator,
        recipient: address,
        amount,
        fee: 250_000,
      })
    },
    [address, mutate, validator]
  )

  const { prevStep } = useStepper()

  return (
    <div className="rounded-xl bg-secondary-foreground max-w-xl mx-auto">
      <div className="p-6 text-background">
        <div className="grid">
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              Available to bond
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {dn.format(balanceDN, { digits: 2, trailingZeros: true })} ALEO
            </div>
          </div>
        </div>
        {/* <Separator className="my-6" /> */}
      </div>
      <div className="rounded-xl bg-primary-foreground p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleBond)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <NumberInput
                      {...field}
                      className="h-auto rounded-xl p-3 pr-20 text-xl"
                    />
                  </FormControl>
                  <div className="absolute top-0 right-2 z-10">
                    <Button
                      className="rounded-lg"
                      type="button"
                      size="sm"
                      onClick={() => {
                        field.onChange(dn.toNumber(balanceDN))
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            <WalletConnectionChecker className="w-full" size="xl">
              <Button
                className="w-full"
                type="submit"
                size="xl"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending && (
                  <Loader2Icon className={cn('mr-2 h-4 w-4 animate-spin')} />
                )}
                {form.formState.errors.amount?.message ||
                  (isPending ? 'Waiting for wallet confirmation' : 'Stake')}
              </Button>
            </WalletConnectionChecker>
            <Button
              className="w-full"
              variant="secondary"
              type="button"
              size="xl"
              disabled={isPending}
              onClick={prevStep}
            >
              Validator Detail
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

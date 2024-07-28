'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
import { useStake } from '~/hooks/use-stake'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import AleoLogoIcon from '~/assets/aleo-logo-icon-light.svg'
import { cn } from '~/lib/utils'

export function StakeWidget() {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data: balance } = useBalance(address)
  const { data: stCreditsBalance } = useStCreditsBalance(address)

  const balanceDN = useMemo(() => dn.from([balance ?? 0n, 6]), [balance])
  const stCreditsBalanceDN = useMemo(
    () => dn.from([stCreditsBalance ?? 0n, 6]),
    [stCreditsBalance]
  )

  const formSchema = useMemo(
    () =>
      z.object({
        amount: z.coerce
          .number({
            required_error: tPrompts('Enter an amount'),
            invalid_type_error: tPrompts('Enter an amount'),
          })
          .gt(0, { message: tPrompts('Enter an amount') })
          .max(dn.toNumber(balanceDN), tPrompts('Insufficient balance'))
          .default(0),
      }),
    [tPrompts, balance, balanceDN]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      amount: '',
    },
  })

  useEffect(() => {
    form.trigger('amount')
  }, [form])

  const { mutate, isPending } = useStake()

  const handleStake = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!address) return

      const amount = dn.from(data.amount, 6)[0]

      mutate({ amount, fee: 250_000 })
    },
    [address, mutate]
  )

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleStake)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div className="flex items-center border rounded-xl p-3 bg-background">
                      <Image src={AleoLogoIcon} alt="Aleo Logo" width={36} />
                      <NumberInput
                        {...field}
                        className="flex-1 h-auto rounded-none pl-2 pr-3 py-0 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Credits amount"
                        onChange={(event) => {
                          const value = event.currentTarget.value ?? ''
                          if (
                            value === '' ||
                            /^[0-9]+(.[0-9]{1,6})?$/.test(value)
                          ) {
                            field.onChange(value)
                          }
                        }}
                      />
                      <Button
                        className="rounded-lg"
                        variant="secondary"
                        type="button"
                        size="sm"
                        onClick={() => {
                          field.onChange(dn.toNumber(balanceDN))
                        }}
                      >
                        MAX
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <WalletConnectionChecker
              className="w-full"
              variant="secondary"
              size="xl"
            >
              <Button
                className="w-full"
                variant="secondary"
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
          </form>
        </Form>
        <ul className="grid gap-3 text-sm mt-6">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">You will receive</span>
            <span>0.923456 stCredits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Exchange rate</span>
            <span>1 Credits = 0.923456 stCredits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Network fee</span>
            <span>0.02 Credits</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

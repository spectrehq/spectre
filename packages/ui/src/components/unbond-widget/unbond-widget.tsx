'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBondState } from '~/hooks/use-bond-state'
import { useCreditsUnbond } from '~/hooks/use-credits-unbond'
import { useCreditsWithdrawAddress } from '~/hooks/use-credits-withdraw-address'
import { cn } from '~/lib/utils'

export function UnbondWidget() {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data: bondState } = useBondState(address)
  const bondedCreditsDN = useMemo(
    () => dn.from([bondState?.microcredits ?? 0n, 6]),
    [bondState]
  )

  const { data: creditsWithdrawAddress } = useCreditsWithdrawAddress(address)

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
            bondState ? dn.toNumber(bondedCreditsDN) : 0,
            'Insufficient staked amount'
          )
          .default(0),
      }),
    [tPrompts, bondState, bondedCreditsDN]
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
    form.trigger()
  }, [form])

  const amountValue = useWatch({ control: form.control, name: 'amount' })

  const { mutate, isPending } = useCreditsUnbond()

  const handleBond = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!address) return

      const amount = dn.from(data.amount, 6)[0]

      mutate({ amount, fee: 250_000 })
    },
    [address, mutate]
  )

  return (
    <div className="rounded-xl w-full mx-auto">
      <div className="p-10 pt-0">
        <div className="grid text-center">
          <div className="text-lg font-medium text-muted-foreground">
            Staked amount
          </div>
          <div className="">
            <span className="mt-1 font-semibold text-3xl sm:text-2xl">
              {dn.format(bondedCreditsDN, { digits: 6 })}
            </span>
            &nbsp;
            <span className="font-medium sm:text-sm text-muted-foreground">
              Credits
            </span>
          </div>
        </div>
        {/* <Separator className="my-6" /> */}
      </div>
      <div className="rounded-xl bg-primary-foreground p-6 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleBond)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div className="flex items-center border rounded-xl p-3 bg-background">
                      <NumberInput
                        {...field}
                        className="flex-1 h-auto rounded-none pl-2 pr-3 py-0 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="0.000000"
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
                          field.onChange(dn.toNumber(bondedCreditsDN))
                        }}
                      >
                        MAX
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {creditsWithdrawAddress && creditsWithdrawAddress !== address && (
              <div className="bg-amber-100 rounded-xl text-primary-foreground text-sm p-5 mb-6">
                You cannot unstake because the withdrawal address is not your
                current wallet address.
              </div>
            )}
            {bondState &&
              dn.lt(dn.mul(bondedCreditsDN, amountValue || 0), 10_000) && (
                <div className="bg-amber-100 rounded-xl text-primary-foreground text-sm p-5 mb-6">
                  After this unstaking your staked Credits will fall below
                  10,000 so that all your staked Credits will be unstaked.
                </div>
              )}
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
                disabled={
                  (creditsWithdrawAddress &&
                    creditsWithdrawAddress !== address) ||
                  !form.formState.isValid ||
                  isPending
                }
              >
                {isPending && (
                  <Loader2Icon className={cn('mr-2 h-4 w-4 animate-spin')} />
                )}
                {form.formState.errors.amount?.message ||
                  (isPending ? 'Waiting for wallet confirmation' : 'Withdraw')}
              </Button>
            </WalletConnectionChecker>
            <div className="text-xs text-muted-foreground">
              Tip: Default Credits unstaking period takes around 18-60 minutes
              (360 blocks) to process.
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

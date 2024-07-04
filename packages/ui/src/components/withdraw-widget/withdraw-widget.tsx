'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { AlertCircleIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { Separator } from '~/components/ui/separator'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useLiquidity } from '~/hooks/use-liquidity'
import { usePendingWithdraw } from '~/hooks/use-pending-withdraw'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { useUserWithdraw } from '~/hooks/use-user-withdraw'
import { useWithdraw } from '~/hooks/use-withdraw'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export function WithdrawWidget() {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data: stCreditsBalance } = useStCreditsBalance(address)

  const balanceDN = useMemo(
    () => dn.from([stCreditsBalance ?? 0n, 6]),
    [stCreditsBalance]
  )

  const { data: userWithdraw } = useUserWithdraw(address)

  const { data: pendingWithdraw } = usePendingWithdraw(address)

  const totalWithdrawAmount = useMemo(() => {
    let total = 0n

    if (userWithdraw) {
      total += userWithdraw.amount
    }

    if (pendingWithdraw) {
      total += pendingWithdraw.amount
    }

    return total
  }, [userWithdraw, pendingWithdraw])

  const totalWithdrawAmountDN = useMemo(
    () => dn.from([totalWithdrawAmount, 6]),
    [totalWithdrawAmount]
  )

  const claimHeightPrompt = useMemo(() => {
    if (pendingWithdraw) {
      return 'Queuing'
    }

    if (!userWithdraw) {
      return '-'
    }

    return dn.format(dn.from(userWithdraw.height), { digits: 0 })
  }, [pendingWithdraw, userWithdraw])

  const { data: liquidity } = useLiquidity()
  const liquidityDN = useMemo(() => dn.from([liquidity ?? 0n, 6]), [liquidity])

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
    [tPrompts, balanceDN]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  })

  const amountValue = useWatch({ control: form.control, name: 'amount' })

  useEffect(() => {
    form.trigger('amount')
  }, [form])

  const { mutate, isPending } = useWithdraw()

  const handleWithdraw = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!address) return

      const amount = dn.from(data.amount, 6)[0]

      const fee = 250_000 // TODO

      mutate({ amount, fee })
    },
    [address, mutate]
  )

  return (
    <div className="rounded-xl bg-foreground max-w-lg mx-auto">
      <div className="p-6 text-background">
        <div className="grid">
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              stALEO Balance
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {dn.format(balanceDN, { digits: 2, trailingZeros: true })} stALEO
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-2">
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              Total withdraw
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {dn.format(totalWithdrawAmountDN, {
                digits: 2,
                trailingZeros: true,
              })}{' '}
              stALEO
            </div>
          </div>
          <div>
            <div className="font-medium text-lg/6 sm:text-sm/6">
              Claim height
            </div>
            <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
              {claimHeightPrompt}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-primary-foreground p-6">
        {dn.lt(liquidityDN, amountValue || 0) && (
          <Alert className="mb-6" variant="warning">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Your withdraw is queuing.</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleWithdraw)}
            className="space-y-4"
          >
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
                {form.formState.errors.amount?.message || 'Withdraw'}
              </Button>
            </WalletConnectionChecker>
          </form>
        </Form>
      </div>
    </div>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import AleoStakingLogoIcon from '~/assets/logo-dark.png'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useCreditsFromStCredits } from '~/hooks/use-credits-from-stcredits'
import { useLiquidity } from '~/hooks/use-liquidity'
import { usePendingWithdraw } from '~/hooks/use-pending-withdraw'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { useUserWithdraw } from '~/hooks/use-user-withdraw'
import { useWithdraw } from '~/hooks/use-withdraw'
import { cn } from '~/lib/utils'

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
      // @ts-ignore
      amount: '',
    },
  })

  const amountValue = useWatch({ control: form.control, name: 'amount' })

  useEffect(() => {
    form.trigger('amount')
  }, [form])

  const { mutate, isPending, isSuccess, error } = useWithdraw()

  const handleWithdraw = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!address) return

      const amount = dn.from(data.amount, 6)[0]

      const fee = 250_000 // TODO

      mutate({ amount, fee })
    },
    [address, mutate]
  )

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      void queryClient.refetchQueries({
        predicate: ({ queryKey }) => queryKey.includes(address),
      })
    }
  }, [isSuccess, form, queryClient, address])

  useEffect(() => {
    if (!error) return

    // TODO
    toast.error('Send Transaction error')
  }, [error])

  const { data: exchangeRate, isLoading: isLoadingExchangeRate } =
    useCreditsFromStCredits(1_000_000n)

  const exchangeRateFormatted = useMemo(
    () => dn.format([exchangeRate ?? 0n, 6], { digits: 6 }),
    [exchangeRate]
  )

  const creditsAmount = useWatch({
    control: form.control,
    name: 'amount',
  })

  const { data: received, isLoading: isLoadingReceived } =
    useCreditsFromStCredits(dn.from(creditsAmount || 0, 6)[0])
  const receivedFormatted = useMemo(
    () => dn.format([received ?? 0n, 6], { digits: 6 }),
    [received]
  )

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          Default stCredits unstaking period takes around 18-60 minutes (360
          blocks) to process. After that you can claim your rewards in{' '}
          <Button className="p-0 h-auto text-sky-400" variant="link" asChild>
            <Link className="" href="/liquid-staking/claim">
              Claim
            </Link>
          </Button>{' '}
          tab.
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleWithdraw)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div className="flex items-center border rounded-xl p-3 bg-background">
                      <div className="w-9 flex items-center justify-center">
                        <Image
                          src={AleoStakingLogoIcon}
                          alt="AleoStaking Logo"
                          width={22}
                        />
                      </div>
                      <NumberInput
                        {...field}
                        className="flex-1 h-auto rounded-none pl-2 pr-3 py-0 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="stCredits amount"
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
                  (isPending ? 'Waiting for wallet confirmation' : 'Withdraw')}
              </Button>
            </WalletConnectionChecker>
          </form>
        </Form>
        <ul className="grid gap-3 text-sm mt-6">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">You will receive</span>
            <span>{receivedFormatted} Credits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Exchange rate</span>
            <span>1 stCredits = {exchangeRateFormatted} Credits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Network fee</span>
            <span>~ 0.25 Credits</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

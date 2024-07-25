'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
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
import Link from 'next/link'
import AleoStakingLogoIcon from '~/assets/logo-dark.png'

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
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-sm p-5 mb-6">
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
                {form.formState.errors.amount?.message || 'Withdraw'}
              </Button>
            </WalletConnectionChecker>
          </form>
        </Form>
        <ul className="grid gap-3 text-sm mt-6">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">You will receive</span>
            <span>1.123456 Credits</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Exchange rate</span>
            <span>1 stCredits = 1.123456 Credits</span>
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

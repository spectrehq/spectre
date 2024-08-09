'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import AleoStakingLogoIcon from '~/assets/logo-dark.png'
import { TransactionToast } from '~/components/transaction-toast'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useUnlock } from '~/hooks/use-unlock'
import { useUserPoints } from '~/hooks/use-user-points'
import { cn } from '~/lib/utils'
import { TransactionStatus } from '~/types'

export function UnlockForm() {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data: userPoints, isFetched: isFetchedUserPoints } =
    useUserPoints(address)
  const userPointsDN = useMemo(
    () => dn.from([userPoints ?? 0n, 6]),
    [userPoints]
  )
  const userPointsNumber = useMemo(
    () => dn.toNumber(userPointsDN),
    [userPointsDN]
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
          .max(userPointsNumber, tPrompts('Insufficient balance'))
          .transform((v) => String(v)),
      }),
    [userPointsNumber, tPrompts]
  )

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: { amount: '' },
  })

  useEffect(() => {
    form.trigger()
  }, [form])

  useEffect(() => {
    if (isFetchedUserPoints) {
      form.trigger('amount')
    }
  }, [form, isFetchedUserPoints])

  const { unlock, transactionStatus } = useUnlock()
  const isPending = useMemo(
    () => transactionStatus === TransactionStatus.Creating,
    [transactionStatus]
  )

  const isShowTransactionToast = useMemo(
    () =>
      Boolean(transactionStatus) &&
      transactionStatus !== TransactionStatus.Creating,
    [transactionStatus]
  )
  const [pointsAmountCache, setPointsAmountCache] = useState<number>(0)

  const handleUnlock = useCallback(
    (data: FormData) => {
      const amount = dn.from(data.amount || 0, 6)[0]
      setPointsAmountCache(Number(data.amount))
      unlock(amount)
    },
    [unlock]
  )

  const stCreditsAmount = useWatch({
    control: form.control,
    name: 'amount',
  })

  const receivedFormatted = useMemo(
    () => dn.format(dn.from(stCreditsAmount || 0), { digits: 6 }),
    [stCreditsAmount]
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUnlock)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
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
                        field.onChange(userPointsNumber)
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
              {form.formState.errors.amount?.message || 'Lock'}
            </Button>
          </WalletConnectionChecker>
        </form>
      </Form>

      <ul className="grid gap-3 text-sm mt-6">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">You will receive</span>
          <span>{receivedFormatted} stCredits</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Network fee</span>
          <span>~ 0.25 Credits</span>
        </li>
      </ul>
      {isShowTransactionToast && (
        <TransactionToast
          title={{
            Creating: '',
            Pending: `You are unlocking ${dn.format(dn.from(pointsAmountCache, 6), 6)} stCredits`,
            Settled: `You have unlocked ${dn.format(dn.from(pointsAmountCache, 6), 6)} stCredits`,
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
        />
      )}
    </>
  )
}

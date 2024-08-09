'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useReadLocalStorage } from 'usehooks-ts'
import { z } from 'zod'
import AleoStakingLogoIcon from '~/assets/logo-dark.png'
import { TransactionToast } from '~/components/transaction-toast'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useLock } from '~/hooks/use-lock'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { cn } from '~/lib/utils'
import { TransactionStatus } from '~/types'

export function LockForm() {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data: stCreditsBalance, isFetched: isFetchedStCreditsBalance } =
    useStCreditsBalance(address)
  const stCreditsBalanceDN = useMemo(
    () => dn.from([stCreditsBalance ?? 0n, 6]),
    [stCreditsBalance]
  )
  const stCreditsBalanceNumber = useMemo(
    () => dn.toNumber(stCreditsBalanceDN),
    [stCreditsBalanceDN]
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
          .max(stCreditsBalanceNumber, tPrompts('Insufficient balance'))
          .transform((v) => String(v)),
      }),
    [stCreditsBalanceNumber, tPrompts]
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
    if (isFetchedStCreditsBalance) {
      form.trigger('amount')
    }
  }, [form, isFetchedStCreditsBalance])

  const { lock, transactionStatus } = useLock()
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
  const [stCreditsAmountCache, setStCreditsAmountCache] = useState<number>(0)

  const inviteCode = useReadLocalStorage<number>('aleostaking_invite_code')

  const handleLock = useCallback(
    (data: FormData) => {
      const amount = dn.from(data.amount || 0, 6)[0]
      setStCreditsAmountCache(Number(data.amount))
      lock(amount, inviteCode ?? 0)
    },
    [lock, inviteCode]
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLock)} className="space-y-6">
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
                        field.onChange(stCreditsBalanceNumber)
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
      {isShowTransactionToast && (
        <TransactionToast
          title={{
            Creating: '',
            Pending: `You are locking ${dn.format(dn.from(stCreditsAmountCache, 6), 6)} Credits`,
            Settled: `You have locked ${dn.format(dn.from(stCreditsAmountCache, 6), 6)} Credits`,
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
        />
      )}
    </>
  )
}
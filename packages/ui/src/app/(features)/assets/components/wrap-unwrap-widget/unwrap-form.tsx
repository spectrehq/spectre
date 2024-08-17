'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { addressToField, field, programAddress } from 'spectre'
import { z } from 'zod'
import AleoStakingLogoIcon from '~/assets/logo-dark.png'
import { TransactionToast } from '~/components/transaction-toast'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useAccount } from '~/hooks/use-account'
import { useMtspBalance } from '~/hooks/use-mtsp-balance'
import { useMtspUnwrap } from '~/hooks/use-mtsp-unwrap'
import { cn } from '~/lib/utils'
import { useNetworkClientStore } from '~/stores/network-client'
import { TransactionStatus } from '~/types'

export function UnwrapForm() {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const network = useNetworkClientStore((store) => store.network)

  const [stCreditsTokenIdField, setStCreditsTokenIdField] = useState<string>()

  const stCreditsProgramId = useMemo(
    () => STCREDITS_PROGRAM_IDS[network],
    [network]
  )

  useEffect(() => {
    programAddress(stCreditsProgramId).then((address) =>
      addressToField(address).then(setStCreditsTokenIdField)
    )
  }, [stCreditsProgramId])

  const { data: wstCreditsBalance, isFetching: isFetchingWstCreditsBalance } =
    useMtspBalance(
      stCreditsTokenIdField ? field(stCreditsTokenIdField) : undefined,
      address
    )

  const wstCreditsBalanceDN = useMemo(
    () => dn.from([wstCreditsBalance?.balance ?? 0n, 6]),
    [wstCreditsBalance]
  )
  const wstCreditsBalanceNumber = useMemo(
    () => dn.toNumber(wstCreditsBalanceDN),
    [wstCreditsBalanceDN]
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
          .max(wstCreditsBalanceNumber, tPrompts('Insufficient balance'))
          .transform((v) => String(v)),
      }),
    [wstCreditsBalanceNumber, tPrompts]
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
    if (isFetchingWstCreditsBalance) {
      form.trigger('amount')
    }
  }, [form, isFetchingWstCreditsBalance])

  const { unwrap, isSuccess, transactionStatus } = useMtspUnwrap()
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
  const [wstCreditsAmountCache, setWstCreditsAmountCache] = useState<number>(0)

  const handleWrap = useCallback(
    (data: FormData) => {
      const amount = dn.from(data.amount || 0, 6)[0]
      setWstCreditsAmountCache(Number(data.amount))
      unwrap(stCreditsProgramId, amount, 500_000)
    },
    [stCreditsProgramId, unwrap]
  )

  const queryClient = useQueryClient()
  useEffect(() => {
    if (isSuccess) {
      form.reset()
      void queryClient.refetchQueries({
        predicate: ({ queryKey }) => queryKey.includes(address),
      })
    }
  }, [address, form, isSuccess, queryClient])

  const wstCreditsAmount = useWatch({
    control: form.control,
    name: 'amount',
  })

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleWrap)} className="space-y-6">
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
                      placeholder="wstCredits amount"
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
                        field.onChange(wstCreditsBalanceNumber)
                      }}
                    >
                      MAX
                    </Button>
                  </div>
                </FormControl>
                <div className="flex justify-end text-sm">
                  <span>
                    Balance: {dn.format(wstCreditsBalanceDN, 6)} wstCredits
                  </span>
                </div>
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
                (isPending ? 'Waiting for wallet confirmation' : 'Unwrap')}
            </Button>
          </WalletConnectionChecker>
        </form>
      </Form>
      <ul className="grid gap-3 text-sm mt-6">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">You will receive</span>
          <span>{wstCreditsAmount || 0} stCredits</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Network fee</span>
          <span>~ 0.5 Credits</span>
        </li>
      </ul>
      {isShowTransactionToast && (
        <TransactionToast
          title={{
            Creating: '',
            Pending: `You are unwrapping ${dn.format(dn.from(wstCreditsAmountCache, 6), 6)} wstCredits`,
            Settled: `You have unwrapped ${dn.format(dn.from(wstCreditsAmountCache, 6), 6)} wstCredits`,
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
        />
      )}
    </>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { Check, ChevronDownIcon, Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import AleoStakingLogoIcon from '~/assets/logo-dark.png'
import { TransactionStatusAlert } from '~/components/transaction-status-alert'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { NumberInput } from '~/components/ui/number-input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useMtspTokenPrivateBalance } from '~/hooks/use-mtsp-token-private-balance'
import { useMtspTransferPrivate } from '~/hooks/use-mtsp-transfer-private'
import { usePrivateBalance } from '~/hooks/use-private-balance'
import { useTransferPrivate } from '~/hooks/use-transfer-private'
import { cn } from '~/lib/utils'
import { shortenAddress } from '~/utils'

type ARC20Token = {
  id: string
  programId: string
  tokenType: 'ARC20'
}

type ARC21Token = {
  id: string
  tokenId: string
  tokenType: 'ARC21'
}

// TODO
const tokens: (ARC20Token | ARC21Token)[] = [
  {
    id: 'stCredits',
    programId: 'staking_stcredits_v1_001.aleo',
    tokenType: 'ARC20',
  },
  {
    id: 'wstCredits',
    tokenId:
      '476751808449955005485749602256602822702928865828767689155319721929394953292field',
    tokenType: 'ARC21',
  },
]

export interface PrivateToPrivateProps {
  defaultValues?: {
    token?: string
    amount?: string
    recipient?: string
  }
  onFormValuesChange?: (values: {
    token?: string
    amount?: string
    recipient?: string
  }) => void
}

export function PrivateToPrivate({
  defaultValues,
  onFormValuesChange,
}: PrivateToPrivateProps) {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data: stCreditsBalance } = usePrivateBalance(
    'staking_stcredits_v1_001.aleo'
  )
  const stCreditsMaxRecordAmount = useMemo(
    () =>
      stCreditsBalance?.records?.reduce((acc, record) => {
        if (record.amount > acc) {
          return record.amount
        }
        return acc
      }, 0n),
    [stCreditsBalance]
  )
  const stCreditsBalanceDN = useMemo(
    () => dn.from([stCreditsMaxRecordAmount ?? 0n, 6]),
    [stCreditsMaxRecordAmount]
  )
  const stCreditsBalanceNumber = useMemo(
    () => dn.toNumber(stCreditsBalanceDN),
    [stCreditsBalanceDN]
  )

  const { data: wstCreditsBalance } = useMtspTokenPrivateBalance(
    '476751808449955005485749602256602822702928865828767689155319721929394953292field' // TODO
  )

  const wstCreditsMaxRecordAmount = useMemo(
    () =>
      wstCreditsBalance?.records?.reduce((acc, record) => {
        if (record.amount > acc) {
          return record.amount
        }
        return acc
      }, 0n),
    [wstCreditsBalance]
  )
  const wstCreditsBalanceDN = useMemo(
    () => dn.from([wstCreditsMaxRecordAmount ?? 0n, 6]),
    [wstCreditsMaxRecordAmount]
  )
  const wstCreditsBalanceNumber = useMemo(
    () => dn.toNumber(wstCreditsBalanceDN),
    [wstCreditsBalanceDN]
  )

  const [amountMax, setAmountMax] = useState<number>(0)

  const formSchema = useMemo(
    () =>
      z.object({
        token: z.coerce.string({ required_error: 'Select a token' }),
        amount: z.coerce
          .number({
            required_error: tPrompts('Enter an amount'),
            invalid_type_error: tPrompts('Enter an amount'),
          })
          .gt(0, { message: tPrompts('Enter an amount') })
          .max(amountMax, tPrompts('Insufficient balance'))
          .transform((v) => String(v)),
        recipient: z.coerce
          .string({ required_error: 'Enter a recipient address' })
          .min(1, { message: 'Enter a recipient address' })
          .min(63, { message: 'Invalid recipient address' })
          // TODO: validate recipient address
          .refine((v) => v.startsWith('aleo1') && v.length === 63, {
            message: 'Invalid recipient address',
          }),
      }),
    [amountMax, tPrompts]
  )

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.trigger()
  }, [form])

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      onFormValuesChange?.(value)
    })
    return () => subscription.unsubscribe()
  }, [form, form.watch, onFormValuesChange])

  useEffect(() => {
    if (stCreditsBalance || wstCreditsBalance) {
      form.trigger('amount')
    }
  }, [form, stCreditsBalance, wstCreditsBalance])

  const {
    transferPrivate,
    reset: resetTransferPrivate,
    isPending: isTransferPrivatePending,
    isSuccess: isTransferPrivateSuccess,
    transactionStatus: transferPrivateTransactionStatus,
  } = useTransferPrivate()

  const {
    mtspTransferPrivate,
    reset: resetMtspTransferPrivate,
    isPending: isMtspTransferPrivatePending,
    isSuccess: isMtspTransferPrivateSuccess,
    transactionStatus: mtspTransferPrivateTransactionStatus,
  } = useMtspTransferPrivate()

  const reset = useCallback(() => {
    resetTransferPrivate()
    resetMtspTransferPrivate()
  }, [resetMtspTransferPrivate, resetTransferPrivate])

  const isPending = useMemo(
    () => isTransferPrivatePending || isMtspTransferPrivatePending,
    [isTransferPrivatePending, isMtspTransferPrivatePending]
  )

  const isSuccess = useMemo(
    () => isTransferPrivateSuccess || isMtspTransferPrivateSuccess,
    [isTransferPrivateSuccess, isMtspTransferPrivateSuccess]
  )

  const transactionStatus = useMemo(
    () =>
      transferPrivateTransactionStatus || mtspTransferPrivateTransactionStatus,
    [transferPrivateTransactionStatus, mtspTransferPrivateTransactionStatus]
  )

  const isShowTransactionStatusAlert = useMemo(
    () => Boolean(transactionStatus),
    [transactionStatus]
  )
  const [amountCache, setAmountCache] = useState<number>(0)
  const [recipientCache, setRecipientCache] = useState<string>('')
  const handleTransactionStatusAlertClose = useCallback(() => {
    reset()
  }, [reset])

  const handleTransferPrivate = useCallback(
    async (data: FormData) => {
      if (!address) return

      const token = tokens.find((token) => token.id === data.token)

      if (!token) return

      const amount = dn.from(data.amount || 0, 6)[0]

      setRecipientCache(data.recipient)
      setAmountCache(Number(data.amount))
      if (token.tokenType === 'ARC20') {
        let plaintext: string | undefined

        for (const record of stCreditsBalance?.records ?? []) {
          if (record.amount === amount) {
            plaintext = record.plaintext
            break
          }

          if (record.amount > amount && plaintext === undefined) {
            plaintext = record.plaintext
          }
        }

        if (!plaintext) return

        transferPrivate(
          token.programId,
          plaintext,
          amount,
          data.recipient,
          250_000
        )
      }

      if (token.tokenType === 'ARC21') {
        let plaintext: string | undefined
        for (const record of wstCreditsBalance?.records ?? []) {
          if (record.amount === amount) {
            plaintext = record.plaintext
            break
          }

          if (record.amount > amount && plaintext === undefined) {
            plaintext = record.plaintext
          }
        }

        if (!plaintext) return

        mtspTransferPrivate(plaintext, amount, data.recipient, 500_000)
      }
    },
    [
      address,
      transferPrivate,
      mtspTransferPrivate,
      stCreditsBalance,
      wstCreditsBalance,
    ]
  )

  const queryClient = useQueryClient()
  useEffect(() => {
    if (isSuccess) {
      form.reset({ recipient: '', amount: '' })
      void queryClient.refetchQueries({
        predicate: ({ queryKey }) => queryKey.includes(address),
      })
    }
  }, [address, form, isSuccess, queryClient])

  const tokenInputValue = useWatch({
    control: form.control,
    name: 'token',
  })

  useEffect(() => {
    if (tokenInputValue === 'stCredits') {
      setAmountMax(stCreditsBalanceNumber)
    }

    if (tokenInputValue === 'wstCredits') {
      setAmountMax(wstCreditsBalanceNumber)
    }

    setTimeout(() => form.trigger('amount'))
  }, [form, stCreditsBalanceNumber, tokenInputValue, wstCreditsBalanceNumber])

  const [open, setOpen] = useState(false)

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleTransferPrivate)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Recipient address"
                    className="p-3 h-auto text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <div className="flex items-center border rounded-xl p-3 bg-background">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover open={open} onOpenChange={handleOpenChange}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="secondary"
                            role="combobox"
                            className={cn(
                              'justify-between rounded-xl border-none text-base',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <Image
                              src={AleoStakingLogoIcon}
                              alt="AleoStaking Logo"
                              width={14}
                              className="mr-1"
                            />
                            {field.value
                              ? tokens.find((token) => token.id === field.value)
                                  ?.id
                              : 'Select token'}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-0" align="start">
                        <Command>
                          {/* <CommandInput placeholder="Search language..." /> */}
                          <CommandList>
                            <CommandEmpty>No token found.</CommandEmpty>
                            <CommandGroup>
                              {tokens.map((token) => (
                                <CommandItem
                                  value={token.id}
                                  key={token.id}
                                  onSelect={() => {
                                    form.setValue('token', token.id)
                                    setOpen(false)
                                  }}
                                  className="min-h-10"
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      token.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {token.id}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="flex items-center">
                        <NumberInput
                          {...field}
                          className="flex-1 h-auto rounded-none pl-2 pr-3 py-0 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Amount"
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
                            field.onChange(amountMax)
                          }}
                        >
                          MAX
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end text-sm">
              <span>
                Max available: {dn.format(dn.from(amountMax, 6), 6)}{' '}
                {tokenInputValue}
              </span>
            </div>
          </div>
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
              {form.formState.errors.recipient?.message ||
                form.formState.errors.amount?.message ||
                (isPending ? 'Waiting for wallet confirmation' : 'Send')}
            </Button>
          </WalletConnectionChecker>
        </form>
      </Form>
      <ul className="grid gap-3 text-sm mt-6">
        <li className="flex items-center justify-between">
          <span className="text-muted-foreground">Network fee</span>
          <span>
            ~ {tokenInputValue === 'stCredits' ? '0.25' : '0.5'} Credits
          </span>
        </li>
      </ul>
      {isShowTransactionStatusAlert && (
        <TransactionStatusAlert
          title={{
            Creating: `You are sending ${dn.format(dn.from(amountCache, 6), 6)} private ${tokenInputValue} to ${shortenAddress(recipientCache)}`,
            Pending: `You are sending ${dn.format(dn.from(amountCache, 6), 6)} private ${tokenInputValue} to ${shortenAddress(recipientCache)}`,
            Settled: `You have sent ${dn.format(dn.from(amountCache, 6), 6)} private ${tokenInputValue} to ${shortenAddress(recipientCache)}`,
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
          onClose={handleTransactionStatusAlertClose}
        />
      )}
    </>
  )
}

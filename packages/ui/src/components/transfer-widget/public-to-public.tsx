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
import { TransactionToast } from '~/components/transaction-toast'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { cn } from '~/lib/utils'
import { TransactionStatus } from '~/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { useMtspBalance } from '~/hooks/use-mtsp-balance'
import { useTransferPublic } from '~/hooks/use-transfer-public'
import { useMtspTransferPublic } from '~/hooks/use-mtsp-transfer-public'
import { shortenAddress } from '~/utils'
import { Input } from '~/components/ui/input'

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

export function PublicToPublic() {
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

  const { data: wstCreditsBalance, isFetched: isFetchedWstCreditsBalance } =
    useMtspBalance(
      476751808449955005485749602256602822702928865828767689155319721929394953292n, // TODO
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
    defaultValues: {
      token: 'stCredits',
      amount: '',
      recipient: '',
    },
  })

  useEffect(() => {
    form.trigger()
  }, [form])

  useEffect(() => {
    if (isFetchedStCreditsBalance || isFetchedWstCreditsBalance) {
      form.trigger('amount')
    }
  }, [form, isFetchedStCreditsBalance, isFetchedWstCreditsBalance])

  const {
    transferPublic,
    isSuccess: isTransferPublicSuccess,
    transactionStatus: transferPublicTransactionStatus,
  } = useTransferPublic()

  const {
    mtspTransferPublic,
    isSuccess: isMtspTransferPublicSuccess,
    transactionStatus: mtspTransferPublicTransactionStatus,
  } = useMtspTransferPublic()

  const isSuccess = useMemo(
    () => isTransferPublicSuccess || isMtspTransferPublicSuccess,
    [isTransferPublicSuccess, isMtspTransferPublicSuccess]
  )

  const transactionStatus = useMemo(
    () =>
      transferPublicTransactionStatus || mtspTransferPublicTransactionStatus,
    [transferPublicTransactionStatus, mtspTransferPublicTransactionStatus]
  )

  const isPending = useMemo(
    () =>
      transferPublicTransactionStatus === TransactionStatus.Creating ||
      mtspTransferPublicTransactionStatus === TransactionStatus.Creating,
    [transferPublicTransactionStatus, mtspTransferPublicTransactionStatus]
  )

  const isShowTransactionToast = useMemo(
    () =>
      Boolean(transactionStatus) &&
      transactionStatus !== TransactionStatus.Creating,
    [transactionStatus]
  )
  const [amountCache, setAmountCache] = useState<number>(0)
  const [recipientCache, setRecipientCache] = useState<string>('')

  const handleTransferPublic = useCallback(
    async (data: FormData) => {
      if (!address) return

      const token = tokens.find((token) => token.id === data.token)

      if (!token) return

      const amount = dn.from(data.amount || 0, 6)[0]

      setRecipientCache(data.recipient)
      setAmountCache(Number(data.amount))
      if (token.tokenType === 'ARC20') {
        transferPublic(token.programId, amount, data.recipient, 250_000)
      }

      if (token.tokenType === 'ARC21') {
        mtspTransferPublic(token.tokenId, amount, data.recipient, 500_000)
      }
    },
    [address, transferPublic, mtspTransferPublic]
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
          onSubmit={form.handleSubmit(handleTransferPublic)}
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
                Balance: {dn.format(dn.from(amountMax, 6), 6)} {tokenInputValue}
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
      {isShowTransactionToast && (
        <TransactionToast
          title={{
            Creating: `You are sending ${dn.format(dn.from(amountCache, 6), 6)} public ${tokenInputValue} to ${shortenAddress(recipientCache)}`,
            Pending: `You are sending ${dn.format(dn.from(amountCache, 6), 6)} public ${tokenInputValue} to ${shortenAddress(recipientCache)}`,
            Settled: `You have sended ${dn.format(dn.from(amountCache, 6), 6)} public ${tokenInputValue} to ${shortenAddress(recipientCache)}`,
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
        />
      )}
    </>
  )
}

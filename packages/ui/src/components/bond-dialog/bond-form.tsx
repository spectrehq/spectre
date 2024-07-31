'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { CircleCheckIcon, CopyIcon, Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Aleo123Logo from '~/assets/aleo123-logo.png'
import AleoscanLogo from '~/assets/aleoscan-logo.png'
import { GradientsAvatar } from '~/components/gradients-avatar'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form'
import { NumberInput } from '~/components/ui/number-input'
import { useStepper } from '~/components/ui/stepper'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { useBondState } from '~/hooks/use-bond-state'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { useCreditsBond } from '~/hooks/use-credits-bond'
import { useCreditsWithdrawAddress } from '~/hooks/use-credits-withdraw-address'
import { useQueryValidator } from '~/hooks/use-query-validator'
import { useValidatorState } from '~/hooks/use-validator-state'
import { cn } from '~/lib/utils'
import type { AleoAddress } from '~/types'
import { shortenAddress } from '~/utils'

export interface BondFormProps {
  validator: AleoAddress
}

export function BondForm({ validator }: BondFormProps) {
  const tPrompts = useTranslations('Prompts')

  const { address } = useAccount()

  const { data, isLoading } = useQueryValidator(validator)

  const { data: validatorState } = useValidatorState(validator)

  // credits balance
  const { data: balance } = useBalance(address)
  const balanceDN = useMemo(() => dn.from([balance ?? 0n, 6]), [balance])

  const { data: bondState } = useBondState(address)
  const bondedCreditsDN = useMemo(
    () => dn.from([bondState?.microcredits ?? 0n, 6]),
    [bondState]
  )

  const { data: creditsWithdrawAddress } = useCreditsWithdrawAddress(address)

  // TODO
  const isFirstBond = useMemo(
    () => dn.eq(bondedCreditsDN, 0),
    [bondedCreditsDN]
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
          .gte(isFirstBond ? 10_000 : 1, {
            message: isFirstBond
              ? 'First time staking needs at least 10,000 Credits.'
              : 'You must stake at least 1 Credits.',
          })
          .max(
            balance ? dn.toNumber(balanceDN) : Number.MAX_SAFE_INTEGER,
            tPrompts('Insufficient balance')
          )
          .default(0),
      }),
    [tPrompts, isFirstBond, balance, balanceDN]
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

  const { mutate, isPending } = useCreditsBond()

  const handleBond = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!address) return

      const amount = dn.from(data.amount, 6)[0]

      mutate({
        validator: validator,
        recipient: address,
        amount,
        fee: 250_000,
      })
    },
    [address, mutate, validator]
  )

  const { prevStep } = useStepper()

  const [isCopied, setIsCopied] = useState(false)
  const [, copy] = useCopyToClipboard()

  const handleCopyAddress = useCallback(async () => {
    if (!validator) return
    setIsCopied(await copy(validator))
    toast.success('Copied!')
  }, [validator, copy])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isCopied])

  return (
    <Card className="border-none shadow-none w-screen max-w-full lg:max-w-xl">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center space-x-2">
          <GradientsAvatar text={validator} size={40} />
          <span>{validator && shortenAddress(validator)}</span>
          <button type="button" onClick={handleCopyAddress}>
            {isCopied ? (
              <CircleCheckIcon className="h-5 w-5 text-green-600" />
            ) : (
              <CopyIcon className="h-5 w-5" />
            )}
          </button>
        </CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <span>View on explorer: </span>
          <Link
            href={`https://testnet.aleoscan.io/address?a=${validator}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={AleoscanLogo} alt="Aleoscan" width={16} height={16} />
          </Link>
          <Link
            href={`https://testnetbeta.aleo123.io/address/${validator}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Aleo123Logo} alt="Aleo123" width={16} height={16} />
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="bg-primary-foreground p-6 rounded-xl">
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Stake</span>
                <span>
                  {dn.format([BigInt(data?.Info.Stake ?? 0), 6], {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Earning</span>
                <span>
                  {dn.format(
                    [BigInt(data?.Info.ValidatorTotalProfit ?? 0), 6],
                    {
                      digits: 2,
                      trailingZeros: true,
                    }
                  )}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Commission</span>
                <span>
                  {dn.format(dn.from(validatorState?.commission ?? 0), {
                    digits: 2,
                  })}
                  %
                </span>
              </li>

              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span>{validatorState?.is_open ? 'OPEN' : 'CLOSE'}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl mx-auto w-full">
            {/* <div className="p-6">
              <div className="grid">
                <div>
                  <div className="font-medium text-lg/6 sm:text-sm/6">
                    Available to bond
                  </div>
                  <div className="mt-1 font-semibold text-3xl/8 sm:text-2xl/8">
                    {dn.format(balanceDN, { digits: 2, trailingZeros: true })}{' '}
                    Credits
                  </div>
                </div>
              </div>
            </div> */}
            {creditsWithdrawAddress && creditsWithdrawAddress !== address && (
              <div className="bg-amber-100 rounded-xl text-primary-foreground text-sm p-5 mb-6">
                Please note that your withdrawal address{' '}
                {creditsWithdrawAddress} is not your current wallet address. If
                you want to change it to your wallet address, you must unstake
                all your Credits and then stake again.
              </div>
            )}
            <div className="rounded-xl bg-primary-foreground p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleBond)}
                  className="space-y-4"
                >
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
                  <div className="flex items-center justify-end text-sm py-1">
                    <span className="text-muted-foreground">Available:</span>
                    &nbsp;
                    <span className="font-medium">
                      {dn.format(balanceDN, {
                        digits: 6,
                      })}{' '}
                      Credits
                    </span>
                  </div>
                  <WalletConnectionChecker
                    className="w-full"
                    variant="secondary"
                    size="xl"
                  >
                    <Button
                      className="w-full"
                      type="submit"
                      variant="secondary"
                      size="xl"
                      disabled={
                        !data?.Info.IsOpen ||
                        (creditsWithdrawAddress &&
                          creditsWithdrawAddress !== address) ||
                        !form.formState.isValid ||
                        isPending
                      }
                    >
                      {isPending && (
                        <Loader2Icon
                          className={cn('mr-2 h-4 w-4 animate-spin')}
                        />
                      )}
                      {form.formState.errors.amount?.message ||
                        (isPending
                          ? 'Waiting for wallet confirmation'
                          : 'Stake')}
                    </Button>
                  </WalletConnectionChecker>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Button
                      className="w-full border-none"
                      variant="secondary"
                      type="button"
                      size="xl"
                      disabled={isPending}
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-px w-full box-content">
                      <Button
                        className="rounded-xl border-muted-foreground border-none w-full h-[46px]"
                        variant="outline"
                        size="xl"
                        asChild
                      >
                        <Link
                          href="/liquid-staking"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                            Liquid
                          </span>
                          &nbsp;
                          <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                            Staking
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

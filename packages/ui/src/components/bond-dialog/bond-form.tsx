'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as dn from 'dnum'
import { Loader2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
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
import { Separator } from '~/components/ui/separator'
import { useStepper } from '~/components/ui/stepper'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useBalance } from '~/hooks/use-balance'
import { useCreditsBond } from '~/hooks/use-credits-bond'
import { useQueryValidator } from '~/hooks/use-query-validator'
import { useValidatorState } from '~/hooks/use-validator-state'
import { cn } from '~/lib/utils'
import type { AleoAddress } from '~/types'
import { shortenAddress } from '~/utils'
import { Skeleton } from '../ui/skeleton'

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
            balance ? dn.toNumber(balanceDN) : Number.MAX_SAFE_INTEGER,
            tPrompts('Insufficient balance')
          )
          .default(0),
      }),
    [tPrompts, balance, balanceDN]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
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

  return (
    <Card className="border-none shadow-none w-screen max-w-xl">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center space-x-2">
          <GradientsAvatar text={validator} size={40} />
          <span>{validator && shortenAddress(validator)}</span>
          <div>
            {isLoading ? (
              <Skeleton className="h-5 w-10" />
            ) : (
              data &&
              (data.Info.IsOpen ? (
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                  OPEN
                </span>
              ) : (
                <span className="max-sm:hidden inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10">
                  CLOSED
                </span>
              ))
            )}
          </div>
          <div className="flex-1" />
        </CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <span>view on explorer: </span>
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
      <CardContent className="px-0">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="bg-secondary p-6 rounded-xl">
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Total Staking Credits
                </span>
                <span>
                  {dn.format([BigInt(data?.Info.Stake ?? 0), 6], {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Validator stake</span>
                <span>
                  {dn.format([BigInt(data?.Info.Delegate ?? 0), 6], {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Delegators Stake</span>
                <span>
                  {dn.format(
                    dn.sub(
                      dn.from([BigInt(data?.Info.Stake ?? 0), 6]),
                      dn.from([BigInt(data?.Info.Delegate ?? 0), 6])
                    ),
                    {
                      digits: 2,
                      trailingZeros: true,
                    }
                  )}
                </span>
              </li>
            </ul>
            <Separator className="my-4" />
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Total Credits Earned
                </span>
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
                <span className="text-muted-foreground">
                  Validator Earnings
                </span>
                <span>
                  {dn.format([BigInt(data?.Info.TotalProfit ?? 0), 6], {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Delegators Earnings
                </span>
                <span>
                  {dn.format(
                    dn.sub(
                      dn.from([
                        BigInt(data?.Info.ValidatorTotalProfit ?? 0),
                        6,
                      ]),
                      dn.from([BigInt(data?.Info.TotalProfit ?? 0), 6])
                    ),
                    {
                      digits: 2,
                      trailingZeros: true,
                    }
                  )}
                </span>
              </li>
            </ul>
            <Separator className="my-4" />
            <ul className="grid gap-2 text-sm">
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
                <span className="text-muted-foreground">Vote</span>
                <span>
                  {dn.format(dn.from((data?.Info.Votes ?? 0) * 100), {
                    digits: 2,
                  })}
                  %
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Unstaking Period</span>
                <span>360 blocks</span>
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
                  <div className="flex items-center justify-end text-sm">
                    <span className="text-muted-foreground">
                      Available to bond:
                    </span>{' '}
                    <span className="font-medium">
                      {dn.format(balanceDN, {
                        digits: 2,
                        trailingZeros: true,
                      })}{' '}
                      Credits
                    </span>
                  </div>
                  <WalletConnectionChecker className="w-full" size="xl">
                    <Button
                      className="w-full"
                      type="submit"
                      size="xl"
                      disabled={
                        !data?.Info.IsOpen ||
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
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="button"
                    size="xl"
                    disabled={isPending}
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

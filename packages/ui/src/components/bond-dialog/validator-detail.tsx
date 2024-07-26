'use client'

import * as dn from 'dnum'
import { CircleCheckIcon, CopyIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts'
import { toast } from 'sonner'
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
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'
import { useStepper } from '~/components/ui/stepper'
import { useCommittee } from '~/hooks/use-committee'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { useQueryValidator } from '~/hooks/use-query-validator'
import { useValidatorState } from '~/hooks/use-validator-state'
import type { AleoAddress } from '~/types'
import { shortenAddress } from '~/utils'

const chartConfig = {
  stake: {
    label: 'Stake',
    color: 'hsl(var(--chart-1))',
  },
  profit: {
    label: 'Earning',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export interface ValidatorDetailProps {
  address: AleoAddress
}

export function ValidatorDetail({ address }: ValidatorDetailProps) {
  const { data, isLoading } = useQueryValidator(address)
  const { data: committee } = useCommittee()
  const { data: validatorState } = useValidatorState(address)

  const chartData = useMemo(
    () =>
      data?.Info.StakeTrend.map(({ Timestamp, Value }) => ({
        timestamp: Timestamp,
        stake: dn.toNumber(dn.from([BigInt(Value), 6])),
        profit: dn.toNumber(
          dn.from([
            BigInt(
              data?.Info.ProfitTrend.find(
                (profit) => profit.Timestamp === Timestamp
              )?.Value ?? 0
            ),
            6,
          ])
        ),
      })) ?? [],
    [data]
  )

  // const apr = useMemo(() => {
  //   if (!data) return 0
  //   const startTime = new Date(data.Info.StartTime).getTime()
  //   const now = Date.now()

  //   const days = Math.floor((now - startTime) / (1000 * 60 * 60 * 24))

  //   return Number(
  //     ((data.Info.ValidatorTotalProfit / data.Info.Stake / days) * 365).toFixed(
  //       4
  //     )
  //   )
  // }, [data])

  const { prevStep, nextStep } = useStepper()

  const [isCopied, setIsCopied] = useState(false)
  const [, copy] = useCopyToClipboard()

  const handleCopyAddress = useCallback(async () => {
    if (!address) return
    setIsCopied(await copy(address))
    toast.success('Copied!')
  }, [address, copy])

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
    <div className="w-screen max-w-full lg:max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GradientsAvatar text={address} size={40} />
            <span>{address && shortenAddress(address)}</span>
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
              href={`https://testnet.aleoscan.io/address?a=${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={AleoscanLogo} alt="Aleoscan" width={16} height={16} />
            </Link>
            <Link
              href={`https://testnetbeta.aleo123.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Aleo123Logo} alt="Aleo123" width={16} height={16} />
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  {dn.format([BigInt(data?.Info.TotalProfit ?? 0), 6], {
                    digits: 2,
                    trailingZeros: true,
                  })}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Stake Share</span>
                <span>
                  {dn.format(
                    dn.mul(
                      dn.div(
                        dn.from([BigInt(data?.Info.Stake ?? 0), 6]),
                        dn.from([BigInt(committee?.totalStake ?? 1), 6])
                      ),
                      100
                    ),
                    { digits: 2 }
                  )}
                  %
                </span>
              </li>
            </ul>

            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Validator Stake</span>
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
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Unbonding Period</span>
                <span>360 blocks</span>
              </li>
            </ul>

            <ul className="grid gap-2 items-start text-sm">
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
              <li className="h-5" />
            </ul>
          </div>
          <div className="pt-6">
            <h4 className="text-lg font-semibold mb-4">Stake / Earning</h4>
            <ChartContainer config={chartConfig} className="h-40 w-full">
              <ComposedChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -24,
                  right: -24,
                  top: 10,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  type="number"
                  domain={[
                    chartData[0]?.timestamp ?? 0,
                    chartData[chartData.length - 1]?.timestamp ?? 0,
                  ]}
                  scale="time"
                  dataKey="timestamp"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value * 1000)
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                  }}
                />
                <YAxis
                  yAxisId="stake"
                  tickFormatter={(value) => {
                    return dn.format(dn.from(value), {
                      locale: 'en',
                      digits: 2,
                      compact: true,
                    })
                  }}
                />
                <YAxis
                  yAxisId="profit"
                  orientation="right"
                  tickFormatter={(value) =>
                    dn.format(dn.from(value), {
                      digits: 2,
                      compact: true,
                      locale: 'en',
                    })
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(_, [payload]) => {
                        const date = new Date(payload.payload.timestamp * 1000)
                        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                      }}
                    />
                  }
                />
                <Line
                  yAxisId="stake"
                  dataKey="stake"
                  type="natural"
                  stroke="var(--color-stake)"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  yAxisId="profit"
                  dataKey="profit"
                  type="natural"
                  fill="var(--color-profit)"
                  fillOpacity={0.4}
                  stroke="var(--color-profit)"
                />
              </ComposedChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end pt-5 space-x-4">
        <Button
          variant="secondary"
          className="border-none"
          disabled={isLoading}
          onClick={prevStep}
        >
          Back
        </Button>
        <Button variant="secondary" disabled={isLoading} onClick={nextStep}>
          Stake
        </Button>
      </div>
    </div>
  )
}

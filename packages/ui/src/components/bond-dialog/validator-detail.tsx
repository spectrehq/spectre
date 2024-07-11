'use client'

import * as dn from 'dnum'
import { useMemo } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts'
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
import { useQueryValidator } from '~/hooks/use-query-validator'
import type { AleoAddress } from '~/types'
import { shortenAddress } from '~/utils'
import { Button } from '../ui/button'
import { useStepper } from '../ui/stepper'
import { useCommittee } from '~/hooks/use-committee'

const chartConfig = {
  stake: {
    label: 'Stake',
    color: 'hsl(var(--chart-1))',
  },
  profit: {
    label: 'Profit',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export interface ValidatorDetailProps {
  address: AleoAddress
}

export function ValidatorDetail({ address }: ValidatorDetailProps) {
  const { data, isLoading } = useQueryValidator(address)
  const { data: committee } = useCommittee()

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

  const apr = useMemo(() => {
    if (!data) return 0
    const startTime = new Date(data.Info.StartTime).getTime()
    const now = Date.now()

    const days = Math.floor((now - startTime) / (1000 * 60 * 60 * 24))

    return Number(
      ((data.Info.ValidatorTotalProfit / data.Info.Stake / days) * 365).toFixed(
        4
      )
    )
  }, [data])

  const { prevStep, nextStep } = useStepper()

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <span>{shortenAddress(address)}</span>
          </CardTitle>
          <CardDescription />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

            <ul className="grid gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Stake Ratio</span>
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
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">APR</span>
                <span>{dn.format(dn.from(apr * 100), { digits: 2 })}%</span>
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
            </ul>
          </div>
          <div className="pt-6">
            <h4 className="text-lg font-semibold mb-4">Stake/Profit</h4>
            <ChartContainer config={chartConfig} className="h-40 w-full">
              <ComposedChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -24,
                  right: -24,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
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
                      digits: 2,
                      compact: true,
                    })
                  }}
                />
                <YAxis
                  yAxisId="profit"
                  orientation="right"
                  tickFormatter={(value) =>
                    dn.format(dn.from(value), { digits: 2, compact: true })
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
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
        <Button variant="secondary" disabled={isLoading} onClick={prevStep}>
          Select another validator
        </Button>
        <Button variant="default" disabled={isLoading} onClick={nextStep}>
          Stake
        </Button>
      </div>
    </div>
  )
}

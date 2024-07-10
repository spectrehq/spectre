'use client'

import * as dn from 'dnum'
import { Area, AreaChart } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'

const chartConfig = {
  profit: {
    label: 'Profit',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export interface TrendChartProps {
  data?: number[]
}

export function TrendChart({ data = [] }: TrendChartProps) {
  const now = Date.now()
  const day = now - (now % (1000 * 60 * 60 * 24))

  const trend = data.slice(0, -1).map((profit, index, arr) => {
    const date = new Date(
      day - (data.length - 1 - index) * (1000 * 60 * 60 * 24)
    ).getTime()

    return { date, profit: dn.toNumber([BigInt(profit ?? 0), 6]) }
  })

  return (
    <ChartContainer className="h-10 w-40" config={chartConfig}>
      <AreaChart accessibilityLayer data={trend}>
        <ChartTooltip
          cursor={false}
          position={{ y: -60 }}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(_, [payload]) => {
                const date = new Date(payload.payload.date)
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              }}
            />
          }
        />
        <Area
          dataKey="profit"
          type="natural"
          fill="var(--color-profit)"
          fillOpacity={0.4}
          stroke="var(--color-profit)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

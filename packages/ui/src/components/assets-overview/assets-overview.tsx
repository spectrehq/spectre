import { Separator } from '~/components/ui/separator'
import { StCreditsBalances } from './stcredits-balances'
import { WStCreditsBalances } from './wstcredits-balance'

export function AssetsOverview() {
  return (
    <div className="max-w-lg mx-auto p-6 pb-9 rounded-t-xl bg-gradient-to-r from-[#28144A] to-[#512A96] -mb-3">
      <StCreditsBalances />
      <Separator className="my-6 bg-muted-foreground/50" />
      <WStCreditsBalances />
    </div>
  )
}

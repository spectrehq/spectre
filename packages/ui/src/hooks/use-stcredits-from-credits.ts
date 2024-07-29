import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { useStCreditsTotalPooled } from './use-stcredits-total-pooled'
import { useStCreditsTotalSupply } from './use-stcredits-total-supply'

export function useStCreditsFromCredits(amount: bigint) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  let { data: totalPooled = 0n } = useStCreditsTotalPooled()

  let { data: totalSupply = 0n } = useStCreditsTotalSupply()

  // TODO
  if (totalPooled === 0n && totalSupply !== 0n) {
    totalPooled = 1_000_000n
  }

  if (totalPooled !== 0n && totalSupply === 0n) {
    totalSupply = 1_000_000n
  }

  return useQuery({
    queryKey: [
      'stCredits',
      'getStCreditsFromCredits',
      String(amount),
      String(totalPooled),
      String(totalSupply),
    ],
    queryFn: () =>
      stCreditsProgram.getStCreditsFromCredits(
        amount,
        totalPooled,
        totalSupply
      ),
  })
}

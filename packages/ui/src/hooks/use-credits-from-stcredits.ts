import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { useStCreditsTotalPooled } from './use-stcredits-total-pooled'
import { useStCreditsTotalSupply } from './use-stcredits-total-supply'

export function useCreditsFromStCredits(amount: bigint) {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  const { data: totalPooled = 0n } = useStCreditsTotalPooled()

  const { data: totalSupply = 0n } = useStCreditsTotalSupply()

  return useQuery({
    queryKey: [
      'stCredits',
      'getCreditsFromStCredits',
      String(amount),
      String(totalPooled),
      String(totalSupply),
    ],
    queryFn: () =>
      stCreditsProgram.getCreditsFromStCredits(
        amount,
        totalPooled,
        totalSupply
      ),
  })
}

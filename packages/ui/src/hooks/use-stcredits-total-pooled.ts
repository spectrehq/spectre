import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { useStCreditsBuffered } from './use-stcredits-buffered'
import { useStCreditsState } from './use-stcredits-state'

export function useStCreditsTotalPooled() {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  const { data: buffered = 0n } = useStCreditsBuffered()

  const {
    data: state = {
      bonded: 0n,
      unbonding: 0n,
      withdraw: 0n,
      pending_withdraw: 0n,
    },
  } = useStCreditsState()

  const { bonded, unbonding, withdraw, pending_withdraw } = state

  return useQuery({
    queryKey: [
      'stCredits',
      'total-pooled',
      String(buffered),
      String(bonded),
      String(unbonding),
      String(withdraw),
      String(pending_withdraw),
    ],
    queryFn: () =>
      stCreditsProgram.getTotalPooled(
        buffered,
        bonded,
        unbonding,
        withdraw,
        pending_withdraw
      ),
    enabled: Boolean(buffered) && Boolean(state),
  })
}

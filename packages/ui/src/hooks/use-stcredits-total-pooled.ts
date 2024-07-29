import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import { useStCreditsBuffered } from './use-stcredits-buffered'
import { useStCreditsState } from './use-stcredits-state'
import { useBalance } from './use-balance'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import type { AleoAddress } from '~/types'

export function useStCreditsTotalPooled() {
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  const network = useNetworkClientStore((store) => store.network)

  const stCreditsProgramId = STCREDITS_PROGRAM_IDS[network]

  // TODO
  // const { data: buffered = 0n } = useStCreditsBuffered()
  const { data: buffered = 0n } = useBalance(stCreditsProgramId as AleoAddress)

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

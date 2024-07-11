import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNetworkClientStore } from '~/stores/network-client'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import type { AleoAddress } from '~/types'
import { useBalance } from './use-balance'

export function useLiquidity() {
  const network = useNetworkClientStore((store) => store.network)
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  const { data: totalBuffered, isLoading: isTotalBufferedLoading } = useBalance(
    STCREDITS_PROGRAM_IDS[network] as AleoAddress
  )

  const { data: state, isLoading: isTotalWithdrawLoading } = useQuery({
    queryKey: ['stCredits', 'totalWithdraw'],
    queryFn: () => stCreditsProgram.getState(),
  })

  const data = useMemo(() => {
    if (!totalBuffered || !state) {
      return null
    }

    if (totalBuffered === 0n) {
      return 0n
    }

    return totalBuffered - state.withdraw
  }, [totalBuffered, state])

  return { data, isLoading: isTotalBufferedLoading || isTotalWithdrawLoading }
}

import { useQuery } from '@tanstack/react-query'
import { StateEnum } from 'spectre'
import { useMemo } from 'react'
import { useNetworkClientStore } from '~/stores/network-client'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { AleoAddress } from '~/types'
import { useBalance } from './use-balance'

export function useLiquidity() {
  const network = useNetworkClientStore((store) => store.network)
  const stCreditsProgram = useNetworkClientStore(
    (store) => store.stCreditsProgram
  )

  const { data: totalBuffered, isLoading: isTotalBufferedLoading } = useBalance(
    STCREDITS_PROGRAM_IDS[network] as AleoAddress
  )

  const { data: totalWithdraw, isLoading: isTotalWithdrawLoading } = useQuery({
    queryKey: ['stCredits', 'totalWithdraw'],
    queryFn: () => stCreditsProgram.getState(StateEnum.TOTAL_WITHDRAW_KEY),
  })

  const data = useMemo(() => {
    if (!totalBuffered || !totalWithdraw) {
      return null
    }

    if (totalBuffered === 0n) {
      return 0n
    }

    return totalBuffered - totalWithdraw
  }, [totalBuffered, totalWithdraw])

  return { data, isLoading: isTotalBufferedLoading || isTotalWithdrawLoading }
}

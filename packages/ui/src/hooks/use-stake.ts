import { useCallback, useMemo } from 'react'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export interface UseStakeParams {
  amount: number
  fee: number
}

export function useStake() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const network = useNetworkClientStore((store) => store.network)

  const programId = useMemo(() => STCREDITS_PROGRAM_IDS[network], [network])

  const stake = useCallback(
    (amount: bigint, fee?: number) => {
      mutate({
        programId,
        functionName: 'supply',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  const stakeAsync = useCallback(
    (amount: bigint, fee?: number) =>
      mutateAsync({
        programId,
        functionName: 'supply',
        inputs: [`${amount}u64`],
        fee,
      }),
    [mutateAsync, programId]
  )

  return { ...rest, stake, stakeAsync }
}

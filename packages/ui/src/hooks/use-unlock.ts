import { useCallback, useMemo } from 'react'
import { STCREDITS_POINTS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useUnlock() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const network = useNetworkClientStore((store) => store.network)
  const programId = useMemo(
    () => STCREDITS_POINTS_PROGRAM_IDS[network],
    [network]
  )

  const unlock = useCallback(
    (amount: bigint, fee?: number) => {
      mutate({
        programId,
        functionName: 'unlock',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutate, programId]
  )

  const unlockAsync = useCallback(
    (amount: bigint, fee?: number) => {
      mutateAsync({
        programId,
        functionName: 'unlock',
        inputs: [`${amount}u64`],
        fee,
      })
    },
    [mutateAsync, programId]
  )

  return { unlock, unlockAsync, ...rest }
}

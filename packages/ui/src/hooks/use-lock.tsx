import { useCallback, useMemo } from 'react'
import { STCREDITS_POINTS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useLock() {
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

  const lock = useCallback(
    (amount: bigint, inviteCode = 0, fee?: number) => {
      mutate({
        programId,
        functionName: 'lock',
        inputs: [`${amount}u64`, `${inviteCode}u32`],
        fee,
      })
    },
    [mutate, programId]
  )

  const lockAsync = useCallback(
    (amount: bigint, inviteCode = 0, fee?: number) => {
      mutateAsync({
        programId,
        functionName: 'lock',
        inputs: [`${amount}u64`, `${inviteCode}u32`],
        fee,
      })
    },
    [mutateAsync, programId]
  )

  return { lock, lockAsync, ...rest }
}

import { useCallback, useMemo } from 'react'
import { STCREDITS_POINTS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useGenerateInviteCode() {
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

  const generate = useCallback(
    (fee?: number) => {
      mutate({
        programId,
        functionName: 'invite_code',
        inputs: [],
        fee,
      })
    },
    [mutate, programId]
  )

  const generateAsync = useCallback(
    (fee?: number) => {
      mutateAsync({
        programId,
        functionName: 'invite_code',
        inputs: [],
        fee,
      })
    },
    [mutateAsync, programId]
  )

  return { generate, generateAsync, ...rest }
}

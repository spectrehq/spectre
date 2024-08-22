import { useCallback, useMemo } from 'react'
import { CREDITS_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useCreditsClaim() {
  const { address, walletType } = useAccount()

  const network = useNetworkClientStore((store) => store.network)

  const programId = useMemo(() => CREDITS_PROGRAM_IDS[network], [network])

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const claim = useCallback(
    (staker: string, fee?: number) => {
      if (!address) return

      mutate({
        programId,
        functionName: 'claim_unbond_public',
        inputs: [staker],
        fee,
      })
    },
    [mutate, programId, address]
  )

  const claimAsync = useCallback(
    (staker: string, fee?: number) => {
      if (!address) return

      mutateAsync({
        programId,
        functionName: 'claim_unbond_public',
        inputs: [staker],
        fee,
      })
    },
    [mutateAsync, programId, address]
  )

  return { ...rest, claim, claimAsync }
}

import { useCallback, useMemo } from 'react'
import { MULTI_TOKEN_SUPPORT_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useMtspTransferPublicToPrivate() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const network = useNetworkClientStore((store) => store.network)
  const multiTokenSupportProgramId = useMemo(
    () => MULTI_TOKEN_SUPPORT_PROGRAM_IDS[network],
    [network]
  )

  const mtspTransferPublicToPrivate = useCallback(
    (token: string, amount: bigint, receiver: string, fee?: number) => {
      mutate({
        programId: multiTokenSupportProgramId,
        functionName: 'transfer_public_to_private',
        inputs: [token, receiver, `${amount}u128`, 'false'],
        fee,
      })
    },
    [multiTokenSupportProgramId, mutate]
  )

  const mtspTransferPublicToPrivateAsync = useCallback(
    (token: string, amount: bigint, receiver: string, fee?: number) => {
      mutateAsync({
        programId: multiTokenSupportProgramId,
        functionName: 'transfer_public_to_private',
        inputs: [token, receiver, `${amount}u128`, 'false'],
        fee,
      })
    },
    [multiTokenSupportProgramId, mutateAsync]
  )

  return {
    ...rest,
    mtspTransferPublicToPrivate,
    mtspTransferPublicToPrivateAsync,
  }
}

import { useCallback } from 'react'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useTransferPublicToPrivate() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const transferPublicToPrivate = useCallback(
    (token: string, amount: bigint, receiver: string, fee?: number) => {
      mutate({
        programId: token,
        functionName: 'transfer_public_to_private',
        inputs: [receiver, `${amount}u64`],
        fee,
      })
    },
    [mutate]
  )

  const transferPublicToPrivateAsync = useCallback(
    (token: string, amount: bigint, receiver: string, fee?: number) => {
      mutateAsync({
        programId: token,
        functionName: 'transfer_public_to_private',
        inputs: [receiver, `${amount}u64`],
        fee,
      })
    },
    [mutateAsync]
  )

  return { ...rest, transferPublicToPrivate, transferPublicToPrivateAsync }
}

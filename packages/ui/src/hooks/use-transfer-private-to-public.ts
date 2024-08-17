import { useCallback } from 'react'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useTransferPrivateToPublic() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const transferPrivateToPublic = useCallback(
    (
      token: string,
      record: string,
      amount: bigint,
      receiver: string,
      fee?: number
    ) => {
      mutate({
        programId: token,
        functionName: 'transfer_private_to_public',
        inputs: [record, receiver, `${amount}u64`],
        fee,
      })
    },
    [mutate]
  )

  const transferPrivateToPublicAsync = useCallback(
    (
      token: string,
      record: string,
      amount: bigint,
      receiver: string,
      fee?: number
    ) => {
      mutateAsync({
        programId: token,
        functionName: 'transfer_private_to_public',
        inputs: [record, receiver, `${amount}u64`],
        fee,
      })
    },
    [mutateAsync]
  )

  return { ...rest, transferPrivateToPublic, transferPrivateToPublicAsync }
}

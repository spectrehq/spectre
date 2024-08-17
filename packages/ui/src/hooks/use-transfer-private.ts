import { useCallback } from 'react'
import { useAccount } from './use-account'
import { useSendTransaction } from './use-send-transaction'

export function useTransferPrivate() {
  const { address, walletType } = useAccount()

  const { mutate, mutateAsync, ...rest } = useSendTransaction({
    address,
    walletType,
  })

  const transferPrivate = useCallback(
    (
      token: string,
      sender: string,
      amount: bigint,
      receiver: string,
      fee?: number
    ) => {
      mutate({
        programId: token,
        functionName: 'transfer_private',
        inputs: [sender, receiver, `${amount}u64`],
        fee,
      })
    },
    [mutate]
  )

  const transferPrivateAsync = useCallback(
    (
      token: string,
      sender: string,
      amount: bigint,
      receiver: string,
      fee?: number
    ) => {
      mutateAsync({
        programId: token,
        functionName: 'transfer_private',
        inputs: [sender, receiver, `${amount}u64`],
        fee,
      })
    },
    [mutateAsync]
  )

  return { ...rest, transferPrivate, transferPrivateAsync }
}

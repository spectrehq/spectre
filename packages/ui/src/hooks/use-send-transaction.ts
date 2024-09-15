import {
  Transaction,
  WalletAdapterNetwork,
  type WalletTransactionError,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import {
  EventStatus,
  EventType,
  getEvent,
  requestCreateEvent,
  type CreateEventRequestData,
} from '@puzzlehq/sdk'
import { useMutation } from '@tanstack/react-query'
import * as dn from 'dnum'
import { useCallback, useRef, useState } from 'react'
import { TransactionStatus, WalletType } from '~/types'

export interface SendTransactionMutationParams {
  programId: string
  functionName: string
  inputs: string[]
  fee?: number
}

export interface UseSendTransactionOptions {
  address?: string | null
  walletType?: WalletType | null
}

export function useSendTransaction({
  address,
  walletType,
}: UseSendTransactionOptions) {
  const {
    wallet,
    requestTransaction,
    transactionStatus: getLeoWalletTransactionStatus,
  } = useWallet()

  const transactionStatusRef = useRef<TransactionStatus | undefined>(undefined)
  const [transactionStatus, setTransactionStatus_] = useState<
    TransactionStatus | undefined
  >(undefined)

  const setTransactionStatus = useCallback(
    (status: TransactionStatus | undefined) => {
      if (status === undefined) {
        transactionStatusRef.current = status
        setTransactionStatus_(status)
      }

      if (
        status === TransactionStatus.Creating &&
        transactionStatusRef.current === undefined
      ) {
        transactionStatusRef.current = status
        setTransactionStatus_(status)
      }

      if (
        status === TransactionStatus.Pending &&
        transactionStatusRef.current === TransactionStatus.Creating
      ) {
        transactionStatusRef.current = status
        setTransactionStatus_(status)
      }

      if (
        status === TransactionStatus.Settled &&
        transactionStatusRef.current === TransactionStatus.Pending
      ) {
        transactionStatusRef.current = status
        setTransactionStatus_(status)
      }

      if (
        status === TransactionStatus.Failed &&
        (transactionStatusRef.current === TransactionStatus.Creating ||
          transactionStatusRef.current === TransactionStatus.Pending)
      ) {
        transactionStatusRef.current = status
        setTransactionStatus_(status)
      }
    },
    []
  )

  const mutation = useMutation({
    mutationFn: async ({
      programId,
      functionName,
      inputs,
      fee = 250_000,
    }: SendTransactionMutationParams) => {
      if (!address || !walletType) return

      if (walletType === WalletType.LeoWallet) {
        setTransactionStatus(TransactionStatus.Creating)
        const tx = Transaction.createTransaction(
          address,
          'mainnet',
          programId,
          functionName,
          inputs,
          fee,
          false
        )

        let transactionId: string | undefined

        try {
          transactionId = await requestTransaction?.(tx)
        } catch (e) {
          setTransactionStatus(TransactionStatus.Failed)

          if ((e as WalletTransactionError).name === 'WalletTransactionError') {
            const error = e as WalletTransactionError
            // TODO
            throw error
          }
        }

        if (!transactionId) {
          setTransactionStatus(TransactionStatus.Failed)
          // TODO
          throw new Error('Unknown error')
        }

        setTransactionStatus(TransactionStatus.Pending)

        while (true) {
          // break after reset
          if (transactionStatusRef.current === undefined) break

          const transactionStatusInner =
            await getLeoWalletTransactionStatus?.(transactionId)

          // TODO
          if (
            (wallet?.adapter.name === 'Leo Wallet' &&
              transactionStatusInner === 'Finalized') ||
            (wallet?.adapter.name === 'Fox Wallet' &&
              transactionStatusInner === 'Completed')
          ) {
            setTransactionStatus(TransactionStatus.Settled)
            break
          }

          if (transactionStatusInner === 'Failed') {
            setTransactionStatus(TransactionStatus.Failed)
            break
          }

          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      if (walletType === WalletType.PuzzleWallet) {
        const puzzleFee = dn.toNumber([BigInt(fee), 6])

        const event: CreateEventRequestData = {
          address,
          type: EventType.Execute,
          programId,
          functionId: functionName,
          fee: puzzleFee,
          inputs,
        }

        setTransactionStatus(TransactionStatus.Creating)

        const { eventId, error } = await requestCreateEvent(event)

        if (error) {
          console.log(error)
          setTransactionStatus(TransactionStatus.Failed)
          // TODO
          throw new Error(error)
        }

        if (eventId) {
          setTransactionStatus(TransactionStatus.Pending)

          while (true) {
            // break after reset
            if (transactionStatusRef.current === undefined) break

            try {
              const { event, error } = await getEvent({ id: eventId, address })

              if (error) {
                console.log(error)

                if (error.includes('Internal server error')) {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  continue
                }

                // TODO
                // throw new Error(error)
                continue
              }

              if (!event) {
                throw new Error('Unknown error')
              }

              if (event.status === EventStatus.Creating) {
                setTransactionStatus(TransactionStatus.Pending)
              } else {
                setTransactionStatus(
                  event.status as unknown as TransactionStatus
                )
              }

              if (
                event.status === EventStatus.Settled ||
                event.status === EventStatus.Failed
              ) {
                break
              }
            } catch (error) {
              console.log(error)
            }

            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }
      }
    },
    onMutate: () => {
      setTransactionStatus(undefined)
      setTransactionStatus(TransactionStatus.Creating)
    },
  })

  const reset = () => {
    mutation.reset()
    setTransactionStatus(undefined)
  }

  return {
    ...mutation,
    reset,
    transactionStatus,
  }
}

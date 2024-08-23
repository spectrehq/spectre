import { getRecords, useBalance as usePuzzleBalance } from '@puzzlehq/sdk'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useMemo } from 'react'
import { useAccount } from './use-account'
import { type AleoAddress, RecordStatus, WalletType } from '~/types'
import { useQuery } from '@tanstack/react-query'
import { u128, u32, u64 } from 'spectre'

type StringRecord = {
  [key: string]: string | StringRecord
}

type Record<Data extends StringRecord> = {
  owner: string

  status: RecordStatus

  name: string
  programId: string
  data: Data

  ciphertext: string
}

export function usePrivateBalance(token = 'credits.aleo') {
  const { address, walletType } = useAccount()

  const { requestRecordPlaintexts } = useWallet()

  const { data: leoWalletRecords, isLoading: isLoadingLeoWalletBalance } =
    useQuery({
      queryKey: ['leoWallet', 'token', 'privateBalance', token, address],
      queryFn: async () => {
        const res: {
          id: string
          owner: AleoAddress
          program_id: string
          spent: boolean
          recordName: string
          ciphertext: string
          plaintext: string
          data: {
            // TODO
            microcredits?: string
            amount?: string
          }
        }[] = (await requestRecordPlaintexts!(token).catch(() => {})) ?? []

        return res
          .filter(
            (record) =>
              record.program_id === token &&
              record.owner === address &&
              !record.spent
          )
          .map((record) => {
            let amount = 0n
            if (token === 'credits.aleo') {
              amount = u64(record.data.microcredits?.split('.')[0] ?? '0u64')
            }

            const amountStr = record.data.amount?.split('.')[0]

            if (amountStr) {
              if (amountStr.endsWith('u128')) {
                amount = u128(amountStr)
              }

              if (amountStr.endsWith('u64')) {
                amount = u64(amountStr)
              }

              if (amountStr.endsWith('u32')) {
                amount = u32(amountStr)
              }
            }

            return {
              id: record.id,
              owner: record.owner,
              status: record.spent ? RecordStatus.Spent : RecordStatus.Unspent,
              name: record.recordName,
              programId: record.program_id,
              data: record.data,
              ciphertext: record.ciphertext,
              plaintext: record.plaintext,
              amount,
            }
          })
      },
      enabled:
        Boolean(requestRecordPlaintexts) && walletType === WalletType.LeoWallet,
    })

  const leoWalletBalance = useMemo(
    () => leoWalletRecords?.reduce((acc, record) => acc + record.amount, 0n),
    [leoWalletRecords]
  )

  const { data: puzzleWalletRecords, isLoading: isLoadingPuzzleWalletBalance } =
    useQuery({
      queryKey: ['puzzleWallet', 'token', 'privateBalance', token, address],
      queryFn: async () => {
        const res = await getRecords({
          address: address ?? undefined,
          filter: {
            programIds: [token],
            status: 'All', // TODO
          },
        }).catch(() => {})

        return res?.records
          ?.filter(
            (record) =>
              record.programId === token &&
              record.owner === address &&
              record.status === 'Unspent'
          )
          .map((record) => {
            let amount = 0n
            if (token === 'credits.aleo') {
              if (typeof record.data.microcredits === 'string') {
                amount = u64(record.data.microcredits.split('.')[0] ?? '0u64')
              }
            }

            // TODO
            // @ts-ignore
            const amountStr = record.data.amount?.split('.')[0]

            if (amountStr) {
              if (amountStr.endsWith('u128')) {
                amount = u128(amountStr)
              }

              if (amountStr.endsWith('u64')) {
                amount = u64(amountStr)
              }

              if (amountStr.endsWith('u32')) {
                amount = u32(amountStr)
              }
            }

            return {
              id: record._id,
              owner: record.owner,
              status: record.status as RecordStatus,
              name: record.name,
              programId: record.programId,
              data: record.data,
              ciphertext: record.ciphertext,
              plaintext: record.plaintext,
              amount,
            }
          })
      },
      enabled: Boolean(address) && walletType === WalletType.PuzzleWallet,
    })

  const puzzleWalletBalance = useMemo(
    () => puzzleWalletRecords?.reduce((acc, record) => acc + record.amount, 0n),
    [puzzleWalletRecords]
  )

  const data = useMemo(() => {
    if (walletType === WalletType.LeoWallet) {
      return { balance: leoWalletBalance, records: leoWalletRecords }
    }

    if (walletType === WalletType.PuzzleWallet) {
      return { balance: puzzleWalletBalance, records: puzzleWalletRecords }
    }
  }, [
    walletType,
    leoWalletBalance,
    leoWalletRecords,
    puzzleWalletBalance,
    puzzleWalletRecords,
  ])

  const isLoading = useMemo(
    () => isLoadingLeoWalletBalance || isLoadingPuzzleWalletBalance,
    [isLoadingLeoWalletBalance, isLoadingPuzzleWalletBalance]
  )

  return { data, isLoading }
}

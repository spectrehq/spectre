import { getRecords, useBalance as usePuzzleBalance } from '@puzzlehq/sdk'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useMemo } from 'react'
import { useAccount } from './use-account'
import { type AleoAddress, WalletType } from '~/types'
import { useQuery } from '@tanstack/react-query'
import { u128, u64 } from 'spectre'

export function usePrivateBalance(token = 'credits.aleo') {
  const { address, walletType } = useAccount()

  const { requestRecords } = useWallet()

  const { data: leoWalletBalance, isLoading: isLoadingLeoWalletBalance } =
    useQuery({
      queryKey: ['leoWallet', 'token', 'privateBalance', token],
      queryFn: async () => {
        const res: {
          id: string
          owner: AleoAddress
          program_id: string
          spent: boolean
          recordName: string
          data: {
            microcredits?: string
            amount?: string
          }
        }[] = (await requestRecords!(token)) ?? []

        return res
          .filter((record) => record.program_id === token && !record.spent)
          .reduce((acc, record) => {
            if (token === 'credits.aleo') {
              return (
                acc + u64(record.data.microcredits?.split('.')[0] ?? '0u64')
              )
            }

            const amountStr = record.data.amount?.split('.')[0]

            if (!amountStr) {
              return acc
            }

            if (amountStr.endsWith('u64')) {
              return acc + u64(amountStr)
            }

            if (amountStr.endsWith('u128')) {
              return acc + u128(amountStr)
            }

            return acc + BigInt(Number(amountStr)) // TODO
          }, 0n)
      },
      enabled: Boolean(requestRecords) && walletType === WalletType.LeoWallet,
    })

  const { data: puzzleWalletBalance, isLoading: isLoadingPuzzleWalletBalance } =
    useQuery({
      queryKey: ['puzzleWallet', 'token', 'privateBalance', token],
      queryFn: async () => {
        const res = await getRecords({
          address: address ?? undefined,
          filter: {
            programIds: [token],
            status: 'All', // TODO
          },
        })

        return res.records
          ?.filter((record) => record.status === 'Unspent')
          .reduce((acc, record) => {
            if (token === 'credits.aleo') {
              if (typeof record.data.microcredits === 'string') {
                return (
                  acc + u64(record.data.microcredits.split('.')[0] ?? '0u64')
                )
              }
            }

            // TODO
            const amountStr = record.data.amount.toString().split('.')[0]

            if (!amountStr) {
              return acc
            }

            if (amountStr.endsWith('u64')) {
              return acc + u64(amountStr)
            }

            if (amountStr.endsWith('u128')) {
              return acc + u128(amountStr)
            }

            return acc + BigInt(Number(amountStr)) // TODO
          }, 0n)
      },
      enabled: Boolean(address) && walletType === WalletType.PuzzleWallet,
    })

  const data = useMemo(() => {
    if (walletType === WalletType.LeoWallet) {
      return leoWalletBalance
    }

    if (walletType === WalletType.PuzzleWallet) {
      return puzzleWalletBalance
    }
  }, [leoWalletBalance, walletType, puzzleWalletBalance])

  const isLoading = useMemo(
    () => isLoadingLeoWalletBalance || isLoadingPuzzleWalletBalance,
    [isLoadingLeoWalletBalance, isLoadingPuzzleWalletBalance]
  )

  return { data, isLoading }
}

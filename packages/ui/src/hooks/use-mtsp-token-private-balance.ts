import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { getRecords } from '@puzzlehq/sdk'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { u128 } from 'spectre'
import { MULTI_TOKEN_SUPPORT_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { WalletType, type AleoAddress } from '~/types'
import { useAccount } from './use-account'

type RecordData = {
  amount: `${number}u128.private`
  token_id: `${number}field.private`
  authorized_until: `${number}u32.private`
  external_authorization_required: `${boolean}.private`
}

export function useMtspTokenPrivateBalance(tokenId?: string) {
  const { address, walletType } = useAccount()

  const { requestRecords } = useWallet()

  const network = useNetworkClientStore((store) => store.network)
  const multiTokenSupportProgramId = useMemo(
    () => MULTI_TOKEN_SUPPORT_PROGRAM_IDS[network],
    [network]
  )

  const { data: leoWalletBalance, isLoading: isLoadingLeoWalletBalance } =
    useQuery({
      queryKey: ['leoWallet', 'mtspToken', 'privateBalance', tokenId],
      queryFn: async () => {
        const res: {
          id: string
          owner: AleoAddress
          program_id: string
          spent: boolean
          recordName: string
          data: RecordData
        }[] = (await requestRecords!(multiTokenSupportProgramId)) ?? []

        return res
          .filter(
            (record) =>
              record.program_id === multiTokenSupportProgramId &&
              record.data.token_id.split('.')[0] === tokenId &&
              !record.spent
          )
          .reduce((acc, record) => {
            const amountStr = record.data.amount.split('.')[0]

            if (amountStr.endsWith('u128')) {
              return acc + u128(amountStr)
            }

            return acc
          }, 0n)
      },
      enabled:
        tokenId !== undefined &&
        Boolean(requestRecords) &&
        walletType === WalletType.LeoWallet,
    })

  const { data: puzzleWalletBalance, isLoading: isLoadingPuzzleWalletBalance } =
    useQuery({
      queryKey: ['puzzleWallet', 'mtspToken', 'privateBalance', tokenId],
      queryFn: async () => {
        const res = await getRecords({
          address: address ?? undefined,
          filter: {
            programIds: [multiTokenSupportProgramId],
            status: 'All', // TODO
          },
        })

        return res.records
          ?.filter(
            (record) =>
              record.programId === multiTokenSupportProgramId &&
              (record.data.token_id as string).split('.')[0] === tokenId &&
              record.status === 'Unspent' // TODO
          )
          .reduce((acc, record) => {
            const amountStr = (record.data.amount as string).split('.')[0]

            if (amountStr.endsWith('u128')) {
              return acc + u128(amountStr)
            }

            return acc
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

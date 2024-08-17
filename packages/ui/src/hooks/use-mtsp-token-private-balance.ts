import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { getRecords } from '@puzzlehq/sdk'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { u128 } from 'spectre'
import { MULTI_TOKEN_SUPPORT_PROGRAM_IDS } from '~/config'
import { useNetworkClientStore } from '~/stores/network-client'
import { RecordStatus, WalletType, type AleoAddress } from '~/types'
import { useAccount } from './use-account'

type RecordData = {
  amount: `${number}u128.private`
  token_id: `${number}field.private`
  authorized_until: `${number}u32.private`
  external_authorization_required: `${boolean}.private`
}

export function useMtspTokenPrivateBalance(tokenId?: string) {
  const { address, walletType } = useAccount()

  const { requestRecordPlaintexts } = useWallet()

  const network = useNetworkClientStore((store) => store.network)
  const multiTokenSupportProgramId = useMemo(
    () => MULTI_TOKEN_SUPPORT_PROGRAM_IDS[network],
    [network]
  )

  const { data: leoWalletRecords, isLoading: isLoadingLeoWalletBalance } =
    useQuery({
      queryKey: ['leoWallet', 'mtspToken', 'privateBalance', tokenId, address],
      queryFn: async () => {
        const res: {
          id: string
          owner: AleoAddress
          program_id: string
          spent: boolean
          recordName: string
          data: RecordData
          plaintext: string
          ciphertext: string
        }[] =
          (await requestRecordPlaintexts!(multiTokenSupportProgramId).catch(
            () => {}
          )) ?? []

        return res
          .filter(
            (record) =>
              record.program_id === multiTokenSupportProgramId &&
              record.data.token_id.split('.')[0] === tokenId &&
              record.owner === address &&
              !record.spent
          )
          .map((record) => {
            let amount = 0n

            const amountStr = record.data.amount.split('.')[0]

            if (amountStr.endsWith('u128')) {
              amount = u128(amountStr)
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
        tokenId !== undefined &&
        Boolean(requestRecordPlaintexts) &&
        walletType === WalletType.LeoWallet,
    })

  const leoWalletBalance = useMemo(
    () =>
      leoWalletRecords?.reduce((acc, record) => {
        const amountStr = record.data.amount.split('.')[0]

        if (amountStr.endsWith('u128')) {
          return acc + u128(amountStr)
        }

        return acc
      }, 0n),
    [leoWalletRecords]
  )

  const { data: puzzleWalletRecords, isLoading: isLoadingPuzzleWalletBalance } =
    useQuery({
      queryKey: [
        'puzzleWallet',
        'mtspToken',
        'privateBalance',
        tokenId,
        address,
      ],
      queryFn: async () => {
        const res = await getRecords({
          address: address ?? undefined,
          filter: {
            programIds: [multiTokenSupportProgramId],
            status: 'All', // TODO
          },
        }).catch(() => {}) // TODO

        return res?.records
          ?.filter(
            (record) =>
              record.programId === multiTokenSupportProgramId &&
              (record.data.token_id as string).split('.')[0] === tokenId &&
              record.status === 'Unspent' // TODO
          )
          .map((record) => {
            let amount = 0n

            const amountStr = (record.data.amount as string).split('.')[0]

            if (amountStr.endsWith('u128')) {
              amount = u128(amountStr)
            }

            return {
              id: record._id,
              owner: record.owner,
              status: record.status as RecordStatus,
              name: record.name,
              programId: record.programId,
              data: record.data,
              ciphertext: record.ciphertext as string,
              plaintext: record.plaintext as string,
              amount,
            }
          })
      },
      enabled: Boolean(address) && walletType === WalletType.PuzzleWallet,
    })

  const puzzleWalletBalance = useMemo(
    () =>
      puzzleWalletRecords?.reduce((acc, record) => {
        const amountStr = (record.data.amount as string).split('.')[0]

        if (amountStr.endsWith('u128')) {
          return acc + u128(amountStr)
        }

        return acc
      }, 0n),
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

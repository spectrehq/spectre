import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useDisconnect as usePuzzleDisconnect } from '@puzzlehq/sdk'
import { useCallback, useMemo } from 'react'
import { WalletType } from '~/types'
import { useAccount } from './use-account'

export function useDisconnect() {
  const { isConnected, walletType } = useAccount()

  const { disconnect: leoDisconnect, disconnecting: isLeoDisconnecting } =
    useWallet()
  const { disconnect: puzzleDisconnect, loading: isPuzzleDisconnecting } =
    usePuzzleDisconnect()

  const disconnect = useCallback(async () => {
    if (!isConnected) return

    if (walletType === WalletType.LeoWallet) {
      await leoDisconnect()
    }

    if (walletType === WalletType.PuzzleWallet) {
      await puzzleDisconnect()
    }
  }, [isConnected, walletType, leoDisconnect, puzzleDisconnect])

  const isDisconnecting = useMemo(
    () => isLeoDisconnecting || isPuzzleDisconnecting,
    [isLeoDisconnecting, isPuzzleDisconnecting]
  )

  return { disconnect, isDisconnecting }
}

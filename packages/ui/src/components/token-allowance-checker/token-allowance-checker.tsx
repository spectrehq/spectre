'use client'

import { Loader2Icon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { programAddress } from 'spectre'
import { TransactionStatusAlert } from '~/components/transaction-status-alert'
import { Button, type ButtonProps } from '~/components/ui/button'
import { STCREDITS_POINTS_PROGRAM_IDS } from '~/config'
import { useAccount } from '~/hooks/use-account'
import { MAX_U64, useApprove } from '~/hooks/use-approve'
import { useStCreditsAllowance } from '~/hooks/use-token-allowance'
import { cn } from '~/lib/utils'
import { useNetworkClientStore } from '~/stores/network-client'

export interface TokenAllowanceCheckerProps extends ButtonProps {
  label?: string
  amount?: bigint
}

export function TokenAllowanceChecker({
  children,
  label = 'Approve',
  amount = MAX_U64,
  ...props
}: TokenAllowanceCheckerProps) {
  const { address } = useAccount()

  const network = useNetworkClientStore((store) => store.network)

  const [stCreditsPointsProgramAddress, setStCreditsPointsProgramAddress] =
    useState<string>()

  const stCreditsPointsProgramId = useMemo(
    () => STCREDITS_POINTS_PROGRAM_IDS[network],
    [network]
  )

  useEffect(() => {
    programAddress(stCreditsPointsProgramId).then(
      setStCreditsPointsProgramAddress
    )
  }, [stCreditsPointsProgramId])

  const {
    data: allowance = 0n,
    isLoading: isLoadingAllowance,
    refetch: refetchAllowance,
  } = useStCreditsAllowance(address, stCreditsPointsProgramAddress)

  const { approve, reset, isPending, isSuccess, transactionStatus } =
    useApprove()

  const handleApprove = useCallback(() => {
    if (!stCreditsPointsProgramAddress) return
    approve(stCreditsPointsProgramAddress, MAX_U64 - allowance)
  }, [allowance, approve, stCreditsPointsProgramAddress])

  const isShowTransactionStatusAlert = useMemo(
    () => Boolean(transactionStatus),
    [transactionStatus]
  )

  const isChecking = useMemo(
    () => !stCreditsPointsProgramAddress || isLoadingAllowance,
    [stCreditsPointsProgramAddress, isLoadingAllowance]
  )

  useEffect(() => {
    if (isSuccess) {
      refetchAllowance()
    }
  }, [refetchAllowance, isSuccess])

  const handleTransactionStatusAlertClose = useCallback(() => {
    reset()
  }, [reset])

  if (allowance !== 0n && allowance >= amount) return <>{children}</>

  return (
    <>
      <Button
        {...props}
        disabled={isChecking || isPending}
        onClick={handleApprove}
      >
        {(isChecking || isPending) && (
          <Loader2Icon className={cn('mr-2 h-4 w-4 animate-spin')} />
        )}
        {isChecking
          ? 'Checking approval'
          : isPending
            ? 'Waiting for wallet confirmation'
            : label}
      </Button>
      {isShowTransactionStatusAlert && (
        <TransactionStatusAlert
          title={{
            Creating: 'Allow the points program to use your stCredits',
            Pending: 'Allow the points program to use your stCredits',
            Settled: 'Allow the points program to use your stCredits', // TODO
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
          onClose={handleTransactionStatusAlertClose}
        />
      )}
    </>
  )
}

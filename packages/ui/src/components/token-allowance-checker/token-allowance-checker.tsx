'use client'

import { Loader2Icon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { programAddress } from 'spectre'
import { TransactionToast } from '~/components/transaction-toast'
import { Button, type ButtonProps } from '~/components/ui/button'
import { STCREDITS_POINTS_PROGRAM_IDS } from '~/config'
import { useAccount } from '~/hooks/use-account'
import { MAX_U64, useApprove } from '~/hooks/use-approve'
import { useStCreditsAllowance } from '~/hooks/use-token-allowance'
import { cn } from '~/lib/utils'
import { useNetworkClientStore } from '~/stores/network-client'
import { TransactionStatus } from '~/types'

export interface TokenAllowanceCheckerProps extends ButtonProps {
  label?: string
}

export function TokenAllowanceChecker({
  children,
  label = 'Approve',
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

  const { data: allowance = 0n, isLoading: isLoadingAllowance } =
    useStCreditsAllowance(address, stCreditsPointsProgramAddress)

  const { approve, transactionStatus } = useApprove()

  const handleApprove = useCallback(() => {
    if (!stCreditsPointsProgramAddress) return
    approve(stCreditsPointsProgramAddress, MAX_U64)
  }, [approve, stCreditsPointsProgramAddress])

  const isPending = useMemo(
    () => transactionStatus === TransactionStatus.Creating,
    [transactionStatus]
  )

  const isShowTransactionToast = useMemo(
    () =>
      Boolean(transactionStatus) &&
      transactionStatus !== TransactionStatus.Creating,
    [transactionStatus]
  )

  const isChecking = useMemo(
    () => !stCreditsPointsProgramAddress || isLoadingAllowance,
    [stCreditsPointsProgramAddress, isLoadingAllowance]
  )

  if (allowance >= MAX_U64) return <>{children}</>

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
      {isShowTransactionToast && (
        <TransactionToast
          title={{
            Creating: '',
            Pending:
              'You are approving AleoStaking points program to access your stCredits',
            Settled:
              'You have approved AleoStaking points program to access your stCredits',
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
        />
      )}
    </>
  )
}

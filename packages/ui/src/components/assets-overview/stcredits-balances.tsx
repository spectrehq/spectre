'use client'

import * as dn from 'dnum'
import { useMemo } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useAccount } from '~/hooks/use-account'
import { usePrivateBalance } from '~/hooks/use-private-balance'
import { useStCreditsBalance } from '~/hooks/use-stcredits-balance'
import { useNetworkClientStore } from '~/stores/network-client'

export function StCreditsBalances() {
  const { address } = useAccount()
  const { data, isLoading } = useStCreditsBalance(address)

  const network = useNetworkClientStore((store) => store.network)

  const stCreditsProgramId = useMemo(
    () => STCREDITS_PROGRAM_IDS[network],
    [network]
  )

  const { data: privateBalance, isLoading: isLoadingPrivateBalance } =
    usePrivateBalance(stCreditsProgramId)

  return (
    <div>
      <div className="font-medium text-sm sm:text-lg">stCredits</div>
      <div className="grid grid-cols-2 items-center">
        <div className="flex items-center">
          <div>Public:&nbsp;</div>
          <div className=" font-semibold text-lg sm:text-xl">
            {isLoading ? (
              <Skeleton className="inline-block w-24">&nbsp;</Skeleton>
            ) : (
              <span>{dn.format([data ?? 0n, 6], 6)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div>Private:&nbsp;</div>
          <div className=" font-semibold text-lg sm:text-xl">
            {isLoadingPrivateBalance ? (
              <Skeleton className="inline-block w-24">&nbsp;</Skeleton>
            ) : (
              <span>{dn.format([privateBalance?.balance ?? 0n, 6], 6)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

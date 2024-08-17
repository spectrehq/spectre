'use client'

import * as dn from 'dnum'
import { useEffect, useMemo, useState } from 'react'
import { addressToField, field, programAddress } from 'spectre'
import { Skeleton } from '~/components/ui/skeleton'
import { STCREDITS_PROGRAM_IDS } from '~/config'
import { useAccount } from '~/hooks/use-account'
import { useMtspBalance } from '~/hooks/use-mtsp-balance'
import { useMtspTokenPrivateBalance } from '~/hooks/use-mtsp-token-private-balance'
import { useNetworkClientStore } from '~/stores/network-client'

export function WStCreditsBalances() {
  const { address } = useAccount()

  const network = useNetworkClientStore((store) => store.network)

  const [stCreditsTokenIdField, setStCreditsTokenIdField] = useState<string>()

  const stCreditsProgramId = useMemo(
    () => STCREDITS_PROGRAM_IDS[network],
    [network]
  )

  useEffect(() => {
    programAddress(stCreditsProgramId).then((address) =>
      addressToField(address).then(setStCreditsTokenIdField)
    )
  }, [stCreditsProgramId])

  const { data: balance, isLoading: isLoadingBalance } = useMtspBalance(
    stCreditsTokenIdField ? field(stCreditsTokenIdField) : undefined,
    address
  )

  const { data: privateBalance, isLoading: isLoadingPrivateBalance } =
    useMtspTokenPrivateBalance(stCreditsTokenIdField)

  return (
    <div>
      <div className="font-medium text-xs sm:text-sm">wstCredits</div>
      <div className="grid grid-cols-2 items-center">
        <div className="flex items-center">
          <div>Public:&nbsp;</div>
          <div className=" font-semibold text-lg sm:text-xl">
            {isLoadingBalance ? (
              <Skeleton className="inline-block w-24">&nbsp;</Skeleton>
            ) : (
              <span>{dn.format([balance?.balance ?? 0n, 6], 6)}</span>
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

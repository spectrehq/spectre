'use client'

import * as dn from 'dnum'
import { GradientsAvatar } from '~/components/gradients-avatar'
import { useAccount } from '~/hooks/use-account'
import { useBondState } from '~/hooks/use-bond-state'
import { useValidatorState } from '~/hooks/use-validator-state'
import type { AleoAddress } from '~/types'
import { Skeleton } from '../ui/skeleton'
import { shortenAddress } from '~/utils'

export function ValidatorInfo() {
  // const { address } = useAccount()
  // TODO: remove
  const address =
    'aleo1anfd8kst08fw9ehxatp3f2s98tm4cq3mawq8tt5wv5hstmdmgygsva0tmf'
  const { data: bondState, isLoading: isLoadingBondState } =
    useBondState(address)
  const { data: validatorState, isLoading: isLoadingValidatorState } =
    useValidatorState(bondState?.validator as AleoAddress)

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 rounded-xl mb-8 border p-6">
      <div className="w-full lg:w-auto mb-4 lg:mb-0">
        <div className="text-sm font-medium mb-4">Your Validator</div>
        <div className="flex items-center">
          {!isLoadingBondState && bondState ? (
            <>
              <GradientsAvatar text={bondState.validator} size={40} />
              <span className="hidden lg:block ml-5 font-medium">
                {bondState?.validator}
              </span>
              <span className="block lg:hidden ml-5 font-medium">
                {shortenAddress(bondState.validator)}
              </span>
            </>
          ) : (
            <Skeleton className="max-w-full w-[560px] h-10" />
          )}
        </div>
      </div>
      <div className="hidden lg:block flex-1" />
      <div className="w-full lg:w-auto flex flex-row lg:flex-col justify-between items-center lg:items-start lg:justify-normal">
        <div className="text-sm font-medium mb-0 lg:mb-4">Staked</div>
        <div>
          {!isLoadingBondState && bondState ? (
            <>
              <span>
                {dn.format([bondState?.microcredits ?? 0n, 6], {
                  digits: 6,
                  locale: 'en',
                })}
              </span>
              &nbsp;
              <span className="text-muted-foreground text-sm">Credits</span>
            </>
          ) : (
            <Skeleton className="max-w-full w-[200px] h-10" />
          )}
        </div>
      </div>
      <div className="w-full lg:w-auto flex flex-row lg:flex-col justify-between items-center lg:items-end lg:justify-normal">
        <div className="text-sm font-medium mb-0 lg:mb-4">Commission</div>
        <div className="text-end">
          {!isLoadingValidatorState && validatorState ? (
            <>
              {dn.format(dn.from(validatorState?.commission ?? 0), {
                digits: 2,
              })}
              %
            </>
          ) : (
            <Skeleton className="w-[100px] h-10" />
          )}
        </div>
      </div>
    </div>
  )
}

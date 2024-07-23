'use client'

import * as dn from 'dnum'
import { GradientsAvatar } from '~/components/gradients-avatar'
import { useAccount } from '~/hooks/use-account'
import { useBondState } from '~/hooks/use-bond-state'
import { useValidatorState } from '~/hooks/use-validator-state'
import type { AleoAddress } from '~/types'
import { Skeleton } from '../ui/skeleton'

export function ValidatorInfo() {
  const { address } = useAccount()
  const { data: bondState, isLoading: isLoadingBondState } =
    useBondState(address)
  const { data: validatorState, isLoading: isLoadingValidatorState } =
    useValidatorState(bondState?.validator as AleoAddress)

  return (
    <div className="flex items-center gap-8 rounded-xl mb-8 border p-6">
      <div>
        <div className="text-sm font-medium mb-4">Your Validator</div>
        <div className="flex items-center">
          {!isLoadingBondState && bondState ? (
            <>
              <GradientsAvatar text={bondState.validator} size={40} />
              <span className="ml-5 font-medium">{bondState?.validator}</span>
            </>
          ) : (
            <Skeleton className="w-[560px] h-10" />
          )}
        </div>
      </div>
      <div className="flex-1" />
      <div>
        <div className="text-sm font-medium mb-4">Staked</div>
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
            <Skeleton className="w-[200px] h-10" />
          )}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium mb-4">Commission</div>
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

import { useQuery } from '@tanstack/react-query'
import type { AleoAddress } from '~/types'

export interface QueryValidatorResponse {
  Info: ValidatorInfo
  count: number
  message: string
  success: boolean
}

export interface ValidatorInfo {
  AddressType: 'validator' | string
  IsOpen: boolean
  Validator: string
  StartTime: string

  Delegate: number
  Stake: number
  TotalProfit: number
  ValidatorTotalProfit: number
  Unbonded: number
  Unbonding: number
  Votes: number

  StakeTrend: { Timestamp: number; Value: number }[]
  ProfitTrend: { Timestamp: number; Value: number }[]
}

export function useQueryValidator(address?: AleoAddress | null) {
  return useQuery({
    queryKey: ['aleo123', 'validator', address],
    queryFn: async () => {
      const res = await fetch(
        `https://testnet.aleo123.io/api/v5/mainnetv0/validat/validator/${address}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await res.json()
      return data as QueryValidatorResponse
    },
    enabled: Boolean(address),
  })
}

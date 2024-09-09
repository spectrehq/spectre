import { useQuery } from '@tanstack/react-query'
import type { AleoAddress } from '~/types'

export interface UseValidatorsFromAleo123Response {
  count: number
  message: string
  success: boolean
  validators: ValidatorFromAleo123[]
}

export interface ValidatorFromAleo123 {
  address: AleoAddress
  is_open: boolean
  profit_total: number
  stake: number
  start_time: string
  trend: number[]
  vote: number
  apr: number
}

export function useValidatorsFromAleo123() {
  return useQuery({
    queryKey: ['aleo123', 'validators'],
    queryFn: async () => {
      const res = await fetch(
        'https://testnet.aleo123.io/api/v5/mainnetv0/validat/validatorlist',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await res.json()

      return {
        ...data,
        validators: (data.Validators as ValidatorFromAleo123[]).map(
          (validator) => {
            const startTime = new Date(validator.start_time).getTime()
            const now = Date.now()

            const days = Math.floor((now - startTime) / (1000 * 60 * 60 * 24))

            const apr = Number(
              ((validator.profit_total / validator.stake / days) * 365).toFixed(
                4
              )
            )
            return { ...validator, trend: validator.trend ?? [], apr }
          }
        ),
      } as UseValidatorsFromAleo123Response
    },
  })
}

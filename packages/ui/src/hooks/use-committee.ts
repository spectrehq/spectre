import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'
import type { AleoAddress } from '~/types'

export interface Validator {
  address: AleoAddress
  staked: number // TODO
  isOpen: boolean
  commission: number
}

export interface QueryCommitteeResponse {
  id: `${number}field`
  members: Record<AleoAddress, [number, boolean, number]>
  starting_round: number
  total_stake: number
}

export function useCommittee() {
  const host = useNetworkClientStore((store) => store.host)
  const network = useNetworkClientStore((store) => store.network)

  return useQuery({
    queryKey: ['committee'],
    queryFn: async () => {
      const res = await fetch(`${host}/${network}/latest/committee`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const data: QueryCommitteeResponse = await res.json()

      const validators: Validator[] = Object.entries(data.members).map(
        ([address, [staked, isOpen, commission]]) => ({
          address: address as AleoAddress,
          staked,
          isOpen,
          commission,
        })
      )

      return {
        id: data.id,
        validators,
        startingRound: data.starting_round,
        totalStake: data.total_stake,
      }
    },
  })
}

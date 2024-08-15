import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useMtspBalance(tokenId?: bigint, address?: string | null) {
  const mtspProgram = useNetworkClientStore((store) => store.mtspProgram)

  return useQuery({
    queryKey: ['mtspProgram', 'balance', String(tokenId), address],
    queryFn: () => mtspProgram.getAuthorizedBalances(tokenId!, address!),
    enabled: tokenId !== undefined && Boolean(address),
  })
}

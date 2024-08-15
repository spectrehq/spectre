import { useQuery } from '@tanstack/react-query'
import { useNetworkClientStore } from '~/stores/network-client'

export function useMtspRegisteredTokens(tokenId: bigint) {
  const mtspProgram = useNetworkClientStore((store) => store.mtspProgram)

  return useQuery({
    queryKey: ['mtspProgram', 'registeredTokens', String(tokenId)],
    queryFn: () => mtspProgram.getRegisteredTokens(tokenId),
  })
}

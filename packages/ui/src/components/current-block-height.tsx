'use client'

import { TriangleAlertIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Skeleton } from '~/components/ui/skeleton'
import { useLatestBlock } from '~/hooks/use-latest-block'

export function CurrentBlockHeight() {
  const { data, isLoading } = useLatestBlock()

  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   let timer: NodeJS.Timeout | null = null
  //   if (data) {
  //     if (timer) clearInterval(timer)
  //     timer = setInterval(() => {
  //       setOpen(Date.now() - data.header.metadata.timestamp * 1000 > 60 * 1000)
  //     }, 5000)
  //   }

  //   return () => {
  //     if (timer) clearInterval(timer)
  //   }
  // }, [data])

  useEffect(() => {
    if (data) {
      setOpen(Date.now() - data.header.metadata.timestamp * 1000 > 60 * 1000)
    }
  }, [data])

  return (
    <div className="fixed bottom-4 right-4 text-xs text-muted-foreground">
      {isLoading ? (
        <Skeleton className="w-20">&nbsp;</Skeleton>
      ) : (
        <Popover open={open}>
          <PopoverTrigger asChild>
            <div className="flex items-center space-x-1">
              <span>{data?.header.metadata.height}</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit">
            <div className="space-y-1">
              <div className="text-sm font-semibold flex items-center space-x-2">
                <TriangleAlertIcon className="w-5 h-5 text-amber-500" />
                <span>Network warning</span>
              </div>
              <div className="text-sm text-muted-foreground">
                You may have lost your network connection.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

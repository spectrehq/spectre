'use client'

import { CircleCheckIcon, CopyIcon } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useCallback, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { useAccount } from '~/hooks/use-account'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { toast } from 'sonner'

export function DepositDialog() {
  const { address } = useAccount()

  const [isCopied, setIsCopied] = useState(false)
  const [, copy] = useCopyToClipboard()

  const handleCopyAddress = useCallback(async () => {
    if (!address) return
    setIsCopied(await copy(address))
    toast.success('Copied!')
  }, [address, copy])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isCopied])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="min-w-24">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Credits</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 p-6">
          <div className="bg-foreground p-4 rounded-xl">
            <QRCodeSVG value={address!} size={256} />
          </div>
          <button type="button" onClick={handleCopyAddress}>
            <div className="p-4 rounded-xl bg-primary/10 break-all flex items-center">
              <span className="text-sm leading-1 text-start mr-2">
                {address}
              </span>
              {isCopied ? (
                <CircleCheckIcon className="h-4 w-4 text-green-600" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

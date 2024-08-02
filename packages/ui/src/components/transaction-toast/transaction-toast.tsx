'use client'

import { CircleCheckBigIcon, CircleXIcon, Loader2Icon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { TransactionStatus } from '~/types'

export interface TransactionToastProps {
  title: string | Record<TransactionStatus, string>
  description?: string | Record<TransactionStatus, string>
  transactionStatus?: TransactionStatus
}

export function TransactionToast({
  title: titleProps,
  description: descriptionProps,
  transactionStatus,
}: TransactionToastProps) {
  const [open, setOpen] = useState(
    transactionStatus && transactionStatus !== TransactionStatus.Creating
  )

  const title: string = useMemo(() => {
    if (!transactionStatus) return ''

    if (typeof titleProps === 'string') return titleProps

    return titleProps?.[transactionStatus]
  }, [titleProps, transactionStatus])

  const description = useMemo(() => {
    if (!transactionStatus) return ''

    if (typeof descriptionProps === 'string') return descriptionProps

    return descriptionProps?.[transactionStatus]
  }, [descriptionProps, transactionStatus])

  useEffect(() => {
    if (transactionStatus === TransactionStatus.Settled) {
      setTimeout(() => {
        setOpen(false)
      }, 3000)
    }
  }, [transactionStatus])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="text-center space-y-8">
          <div className="flex justify-center items-center">
            {transactionStatus === TransactionStatus.Pending && (
              <Loader2Icon className="animate-spin w-20 h-20" strokeWidth="1" />
            )}
            {transactionStatus === TransactionStatus.Settled && (
              <CircleCheckBigIcon
                className="w-20 h-20 text-green-500"
                strokeWidth="1"
              />
            )}
            {transactionStatus === TransactionStatus.Failed && (
              <CircleXIcon className="w-20 h-20 text-red-500" strokeWidth="1" />
            )}
          </div>
          <div>
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              {title}
            </h4>
            {transactionStatus === TransactionStatus.Pending && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>

          {transactionStatus === TransactionStatus.Pending && (
            <p className="text-sm text-muted-foreground">
              Waiting for transaction confirmation
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

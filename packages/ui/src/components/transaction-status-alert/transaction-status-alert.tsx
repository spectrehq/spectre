'use client'

import { Cancel as AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import {
  CircleCheckBigIcon,
  CircleXIcon,
  Loader2Icon,
  XIcon,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { cn } from '~/lib/utils'
import { TransactionStatus } from '~/types'

export interface TransactionStatusAlertProps {
  title: string | Record<TransactionStatus, string>
  description?: string | Record<TransactionStatus, string>
  transactionStatus?: TransactionStatus
  onClose?: () => void
}

export function TransactionStatusAlert({
  title: titleProps,
  description: descriptionProps,
  transactionStatus,
  onClose,
}: TransactionStatusAlertProps) {
  const [open, setOpen] = useState(true)

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
        onClose?.()
      }, 3000)
    }
  }, [onClose, transactionStatus])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open)

      if (!open) {
        onClose?.()
      }
    },
    [onClose]
  )

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle />
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="text-center space-y-8">
          <div className="flex justify-center items-center">
            {(transactionStatus === TransactionStatus.Pending ||
              transactionStatus === TransactionStatus.Creating) && (
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
          <div
            className={cn(
              transactionStatus === TransactionStatus.Settled ||
                (transactionStatus === TransactionStatus.Failed && 'pb-4')
            )}
          >
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
              {title}
            </h4>
            {transactionStatus === TransactionStatus.Pending && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>

          {transactionStatus === TransactionStatus.Creating && (
            <p className="text-sm text-muted-foreground">
              Waiting for wallet confirmation
            </p>
          )}

          {transactionStatus === TransactionStatus.Pending && (
            <p className="text-sm text-muted-foreground">
              Waiting for transaction confirmation
            </p>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

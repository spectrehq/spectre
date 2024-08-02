'use client'

import { Cancel as AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import {
  CircleCheckBigIcon,
  CircleXIcon,
  Loader2Icon,
  XIcon,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
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
    <AlertDialog open={open} onOpenChange={setOpen}>
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
      </AlertDialogContent>
    </AlertDialog>
  )
}

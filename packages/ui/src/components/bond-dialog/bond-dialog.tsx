'use client'

import { type ReactNode, useCallback, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import type { AleoAddress } from '~/types'
import { BondWidget } from './bond-widget'

export interface BondDialogProps {
  open?: boolean
  step?: number
  validator?: AleoAddress | null
  onClose?: () => void
  children?: ReactNode
}

export function BondDialog({
  open: openProps,
  step = 0,
  validator,
  onClose,
  children,
}: BondDialogProps) {
  const [open, setOpen] = useState(() => openProps)

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open)
      if (!open && onClose) {
        onClose()
      }
    },
    [onClose]
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-full md:max-w-fit max-h-[calc(100vh-72px)] flex flex-col">
        <DialogHeader className="flex-none">
          <DialogTitle>Stake</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="disable-scrollbar flex-grow overflow-y-scroll">
          <BondWidget step={step} validator={validator} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

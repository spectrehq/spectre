'use client'

import { Loader2Icon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { useAccountStore } from '~/stores/account'

export function ConnectingWalletDialog() {
  const isConnecting = useAccountStore((store) => store.isConnecting)

  return (
    <AlertDialog open={isConnecting} onOpenChange={() => {}}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Connecting wallet</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <Loader2Icon className="animate-spin w-20 h-20" />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Please approve the connection in your wallet
            </p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

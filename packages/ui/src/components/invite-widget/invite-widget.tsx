'use client'

import * as dn from 'dnum'
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CopyIcon,
  Loader2Icon,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'
import { TransactionToast } from '~/components/transaction-toast'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { WalletConnectionChecker } from '~/components/wallet-connection-checker'
import { useAccount } from '~/hooks/use-account'
import { useGenerateInviteCode } from '~/hooks/use-generate-invite-code'
import { useUserInviteCode } from '~/hooks/use-user-invite-code'
import { cn } from '~/lib/utils'
import { TransactionStatus } from '~/types'

export function InviteWidget() {
  const { address } = useAccount()

  const { data: inviteCode, isLoading: isLoadingInviteCode } =
    useUserInviteCode(address)

  const hasInviteCode = useMemo(
    () => Boolean(inviteCode) && inviteCode !== 0n,
    [inviteCode]
  )

  const inviteLink = useMemo(
    () =>
      inviteCode ? `https://aleostaking.org?invite_code=${inviteCode}` : null,
    [inviteCode]
  )

  const [isCopied, setIsCopied] = useState(false)
  const [, copy] = useCopyToClipboard()

  const handleCopyLink = useCallback(async () => {
    if (!inviteLink) return
    setIsCopied(await copy(inviteLink))
    toast.success('Copied your invite link!')
  }, [inviteLink, copy])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isCopied])

  const { generate, transactionStatus } = useGenerateInviteCode()

  const handleGenerate = useCallback(() => {
    generate()
  }, [generate])

  const isPending = useMemo(
    () => transactionStatus === TransactionStatus.Creating,
    [transactionStatus]
  )

  const isShowTransactionToast = useMemo(
    () =>
      Boolean(transactionStatus) &&
      transactionStatus !== TransactionStatus.Creating,
    [transactionStatus]
  )

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          You will earn +16% on top of any Points your invites earn, and +8% on
          top of any Points your invites&apos; invites earn.
        </div>

        <div className="rounded-xl bg-muted grid grid-cols-2 gap-2 p-5 mb-6">
          <div>
            <div className="text-sm text-muted-foreground">Invite Code</div>
            <div className="text-lg font-bold">
              {isLoadingInviteCode ? (
                <Skeleton className="w-20 bg-primary-foreground">
                  &nbsp;
                </Skeleton>
              ) : hasInviteCode ? (
                <span className="">{inviteCode?.toString()}</span>
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground flex items-center">
              Invitation Bonus Points
            </div>
            <div className="text-lg">{dn.format([65401n, 0])}</div>
          </div>
        </div>

        <WalletConnectionChecker
          className="w-full"
          variant="secondary"
          size="xl"
        >
          {hasInviteCode ? (
            <Button
              className="w-full"
              variant="secondary"
              size="xl"
              onClick={handleCopyLink}
            >
              <span className="mr-1">Copy your invite link</span>
            </Button>
          ) : (
            <Button
              className="w-full"
              variant="secondary"
              size="xl"
              disabled={isPending}
              onClick={handleGenerate}
            >
              {isPending && (
                <Loader2Icon className={cn('mr-2 h-4 w-4 animate-spin')} />
              )}
              {isPending
                ? 'Waiting for wallet confirmation'
                : 'Generate your invite link'}
            </Button>
          )}
        </WalletConnectionChecker>

        <ul className="grid gap-3 text-sm mt-6">
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-muted-foreground">
                Earned points on top of your invites
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelpIcon className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      You will earn +16% on top of any Points your invites earn
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span>-</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-muted-foreground">
                Earned points on top of your invites&apos; invites
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelpIcon className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      You will earn +8% on top of any Points your invites earn
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span>-</span>
          </li>
        </ul>
      </div>
      {isShowTransactionToast && (
        <TransactionToast
          title={{
            Creating: '',
            Pending: 'You are generating your invite link',
            Settled: 'You have generated your invite link',
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
        />
      )}
    </div>
  )
}

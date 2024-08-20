'use client'

import { useQueryClient } from '@tanstack/react-query'
import * as dn from 'dnum'
import { CircleHelpIcon, Loader2Icon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'
import { TransactionStatusAlert } from '~/components/transaction-status-alert'
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
import { usePointsState } from '~/hooks/use-points-state'
import { useUserInviteCode } from '~/hooks/use-user-invite-code'
import { cn } from '~/lib/utils'

export function InviteWidget() {
  const { address } = useAccount()

  const { data: userPointsState, isLoading: isLoadingUserPointsState } =
    usePointsState(address)

  const { data: inviteCode, isLoading: isLoadingInviteCode } =
    useUserInviteCode(address)

  const hasInviteCode = useMemo(
    () => Boolean(inviteCode) && inviteCode !== 0n,
    [inviteCode]
  )

  const inviteLink = useMemo(
    () =>
      inviteCode
        ? `${window.location.protocol}//${window.location.host}?invite_code=${inviteCode}`
        : null,
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

  const { generate, reset, isPending, isSuccess, transactionStatus } =
    useGenerateInviteCode()

  const handleGenerate = useCallback(() => {
    generate()
  }, [generate])

  const isShowTransactionStatusAlert = useMemo(
    () => Boolean(transactionStatus),
    [transactionStatus]
  )
  const handleTransactionStatusAlertClose = useCallback(() => {
    reset()
  }, [reset])

  const queryClient = useQueryClient()
  useEffect(() => {
    if (isSuccess) {
      void queryClient.refetchQueries({
        predicate: ({ queryKey }) => queryKey.includes(address),
      })
    }
  }, [address, isSuccess, queryClient])

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          You will earn +16% on top of any Points your invites earn, and +8% on
          top of any Points your invites&apos; invites earn.
        </div>

        <div className="rounded-xl bg-muted grid grid-cols-2 gap-2 p-5 mb-6">
          <div>
            <div className="text-sm text-muted-foreground">Invite code</div>
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
              Invitation bonus points
            </div>
            <div className="text-lg">
              {isLoadingUserPointsState || userPointsState === undefined ? (
                <Skeleton className="w-24">&nbsp;</Skeleton>
              ) : userPointsState === null ? (
                '-'
              ) : (
                dn.format(
                  [
                    userPointsState.invite_points +
                      userPointsState.invite_of_invite_points,
                    6,
                  ],
                  6
                )
              )}
            </div>
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
            <div>
              {isLoadingUserPointsState || userPointsState === undefined ? (
                <Skeleton className="w-24">&nbsp;</Skeleton>
              ) : (
                <span>
                  {userPointsState === null
                    ? '-'
                    : dn.format([userPointsState.invite_points, 6], 6)}
                </span>
              )}
            </div>
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
            <div>
              {isLoadingUserPointsState || userPointsState === undefined ? (
                <Skeleton className="w-20">&nbsp;</Skeleton>
              ) : (
                <span>
                  {userPointsState === null
                    ? '-'
                    : dn.format(
                        [userPointsState.invite_of_invite_points, 6],
                        6
                      )}
                </span>
              )}
            </div>
          </li>
        </ul>
      </div>
      {isShowTransactionStatusAlert && (
        <TransactionStatusAlert
          title={{
            Creating: 'You are generating your invite link',
            Pending: 'You are generating your invite link',
            Settled: 'You have generated your invite link',
            Failed: 'Transaction failed',
          }}
          transactionStatus={transactionStatus}
          onClose={handleTransactionStatusAlertClose}
        />
      )}
    </div>
  )
}

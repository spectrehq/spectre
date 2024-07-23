import { CircleHelpIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { BondDialog } from '~/components/bond-dialog'
import { DepositDialog } from '../deposit-dialog'
import { WalletConnectionChecker } from '../wallet-connection-checker'
import { ValidatorInfo } from './validator-info'
import { UnbondDialog } from '../unbond-dialog'
import { CreditsClaimDialog } from '../credits-claim-dialog'

export function MyValidator() {
  return (
    <section>
      <div className="container">
        <div className="pt-4 py-8 grid grid-cols-1 lg:grid-cols-7 items-center justify-between gap-20">
          <div className="flex items-center justify-between flex-1 col-span-1 lg:col-span-4">
            <div>
              <h6 className="text-sm font-medium text-muted-foreground flex items-center mb-3">
                Staked
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="w-4 h-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The amount of your Credits that are bonded to validators
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h6>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-semibold">100.123456</span>{' '}
                  <span className="text-muted-foreground">Credits</span>
                </div>
              </div>
            </div>
            <div className="space-x-4 flex items-center">
              <BondDialog>
                <Button variant="secondary">Stake</Button>
              </BondDialog>
              <UnbondDialog />
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-px w-fit">
                <Button
                  className="rounded-full border-muted-foreground border-none"
                  variant="outline"
                  asChild
                >
                  <Link href="/liquid-staking">
                    <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                      Liquid
                    </span>
                    &nbsp;
                    <span className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
                      Staking
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center col-span-1 lg:col-span-3 rounded-xl border p-5">
            <div>
              <h6 className="text-sm font-medium text-muted-foreground flex items-center mb-3">
                Unstaking
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="w-4 h-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        The amount of your Credits that are currently in the
                        unbonding period
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h6>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-semibold">100.123456</span>{' '}
                  <span className="text-muted-foreground">Credits</span>
                </div>
              </div>
              <div className="text-sm">
                <span>Claim Height: 601234</span>{' '}
                <span>(ETA. 2024-12-31 12:30:00)</span>
              </div>
            </div>
            <div className="space-x-4">
              <CreditsClaimDialog />
            </div>
          </div>
        </div>

        <ValidatorInfo />
      </div>
    </section>
  )
}

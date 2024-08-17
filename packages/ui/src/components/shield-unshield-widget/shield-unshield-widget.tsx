import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { ShieldForm } from './shield-form'
import { UnshieldForm } from './unshield-form'

export function ShieldUnshieldWidget() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          You can shield your public stCredits into private stCredits.
          Conversely you can also unshield your private stCredits into public
          stCredits. Private stCredits, which are stored as multiple{' '}
          <Button className="p-0 h-auto text-sky-400" variant="link" asChild>
            <Link
              className=""
              href="https://developer.aleo.org/concepts/records"
              target="_blank"
              rel="noreferrer"
            >
              records
            </Link>
          </Button>
          , can only be viewed by your{' '}
          <Button className="p-0 h-auto text-sky-400" variant="link" asChild>
            <Link
              className=""
              href="https://developer.aleo.org/concepts/accounts/#account-view-key"
              target="_blank"
              rel="noreferrer"
            >
              view key
            </Link>
          </Button>{' '}
          (or by your wallet). The same goes for wstCredits.
        </div>
        <Tabs defaultValue="shield">
          <TabsList className="mb-6 grid w-full grid-cols-2 rounded-full">
            <TabsTrigger className="rounded-full" value="shield">
              Shield
            </TabsTrigger>
            <TabsTrigger className="rounded-full" value="unshield">
              Unshield
            </TabsTrigger>
          </TabsList>
          <TabsContent value="shield">
            <ShieldForm />
          </TabsContent>

          <TabsContent value="unshield">
            <UnshieldForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

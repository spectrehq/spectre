import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { UnwrapForm } from './unwrap-form'
import { WrapForm } from './wrap-form'

export function WrapUnwrapWidget() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          wstCredits (wrapped stCredits) is the MTSP (ARC-21) version of
          stCredits (ARC-20). stCredits and wstCredits are completely equivalent
          and can be converted (wrap or unwrap) into each other. You can use
          stCredits or wstCredits in various ZeFi DApps as long as they support
          ARC-20 or ARC-21.
        </div>
        <Tabs defaultValue="wrap">
          <TabsList className="mb-6 grid w-full grid-cols-2 rounded-full">
            <TabsTrigger className="rounded-full" value="wrap">
              Wrap
            </TabsTrigger>
            <TabsTrigger className="rounded-full" value="unwrap">
              Unwrap
            </TabsTrigger>
          </TabsList>
          <TabsContent value="wrap">
            <WrapForm />
          </TabsContent>

          <TabsContent value="unwrap">
            <UnwrapForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { PublicToPublic } from './public-to-public'
import { PrivateToPrivate } from './private-to-private'

export function TransferWidget() {
  const [defaultValues, setDefaultValues] = useState<{
    token?: string
    amount?: string
    recipient?: string
  }>({
    token: 'stCredits',
    amount: '',
    recipient: '',
  })

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <Tabs defaultValue="public">
          <TabsList className="mb-6 grid w-full grid-cols-2 rounded-full">
            <TabsTrigger className="rounded-full" value="public">
              Public
            </TabsTrigger>
            <TabsTrigger className="rounded-full" value="private">
              Private
            </TabsTrigger>
          </TabsList>
          <TabsContent value="public">
            <PublicToPublic
              defaultValues={defaultValues}
              onFormValuesChange={setDefaultValues}
            />
          </TabsContent>

          <TabsContent value="private">
            <PrivateToPrivate
              defaultValues={defaultValues}
              onFormValuesChange={setDefaultValues}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

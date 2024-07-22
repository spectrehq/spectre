'use client'

import { useState } from 'react'
import { Step, type StepItem, Stepper } from '~/components/ui/stepper'
import type { AleoAddress } from '~/types'
import { BondForm } from './bond-form'
import { ValidatorDetail } from './validator-detail'
import { ValidatorList } from './validator-list'

const steps = [
  { id: 'selectValidator', label: 'Select validator' },
  { id: 'validatorDetail', label: 'Validator detail' },
  { id: 'stake', label: 'Stake' },
] satisfies StepItem[]

export interface BondWidgetProps {
  step?: number
  validator?: AleoAddress | null
}

export function BondWidget({ step = 0, validator }: BondWidgetProps) {
  const [selectedValidator, setSelectedValidator] = useState<
    AleoAddress | undefined | null
  >(validator)

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={step} steps={steps} size="sm" className="mb-4 mt-5">
        <Step key="selectValidator" label="Select validator">
          <ValidatorList onSelect={setSelectedValidator} />
        </Step>

        <Step key="validatorDetail" label="Validator detail">
          <ValidatorDetail key="validatorDetail" address={selectedValidator!} />
        </Step>

        <Step key="stake" label="Stake">
          <BondForm validator={selectedValidator!} />
        </Step>
      </Stepper>
    </div>
  )
}

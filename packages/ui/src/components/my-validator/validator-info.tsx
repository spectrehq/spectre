'use client'

import { GradientsAvatar } from '~/components/gradients-avatar'

export function ValidatorInfo() {
  return (
    <div className="flex items-center gap-8 rounded-xl mb-8 border p-6">
      <div>
        <div className="text-sm font-medium mb-4">Your Validator</div>
        <div className="flex items-center">
          <GradientsAvatar text="hello" size={40} />
          <span className="ml-5 font-medium">
            aleo1hrkval4dy3mfz6srqpz40dhfdl4jmxns3u604xth34ge75nrjgps0tqy30
          </span>
        </div>
      </div>
      <div className="flex-1" />
      <div>
        <div className="text-sm font-medium mb-4">Staked</div>
        <div>
          <span>100.123456</span>
          &nbsp;
          <span className="text-muted-foreground text-sm">Credits</span>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium mb-4">Commission</div>
        <div className="text-end">10%</div>
      </div>
    </div>
  )
}

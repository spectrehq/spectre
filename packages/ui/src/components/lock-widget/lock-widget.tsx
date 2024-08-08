import { LockForm } from './lock-form'

export function LockWidget() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-xl bg-primary-foreground p-6">
        <div className="bg-amber-100 rounded-xl text-primary-foreground text-xs md:text-sm p-5 mb-6">
          You will earn more Points over time based on how many stCredits you
          lock and how long the stCredits are locked for.
        </div>
        <LockForm />
      </div>
    </div>
  )
}

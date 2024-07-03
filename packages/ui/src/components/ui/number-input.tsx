import * as React from 'react'

import { cn } from '~/lib/utils'

const FLOATING_POINT_REGEX = /^[0-9+.]$/

/**
 * Determine if a character is a DOM floating point character
 * @see https://www.w3.org/TR/2012/WD-html-markup-20120329/datatypes.html#common.data.float
 */
function isFloatingPointNumericCharacter(character: string) {
  return FLOATING_POINT_REGEX.test(character)
}

function isValidNumericKeyboardEvent(
  event: React.KeyboardEvent,
  isValid: (key: string) => boolean,
) {
  if (event.key == null) return true
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
  const isSingleCharacterKey = event.key.length === 1
  if (!isSingleCharacterKey || isModifierKey) return true
  return isValid(event.key)
}

export interface NumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  step?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, ...props }, ref) => {
    const step = props.step ?? 1

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.nativeEvent.isComposing) return

      if (
        !isValidNumericKeyboardEvent(event, isFloatingPointNumericCharacter)
      ) {
        event.preventDefault()
      }

      /**
       * Keyboard Accessibility
       *
       * We want to increase or decrease the input's value
       * based on if the user the arrow keys.
       *
       * @see https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-17
       */
      const stepFactor = getStepFactor(event) * step

      const eventKey = event.key

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        // ArrowUp: () => increment(stepFactor),
        // ArrowDown: () => decrement(stepFactor),
        // Home: () => updateFn(min),
        // End: () => updateFn(max),
        ArrowUp: () => {},
        ArrowDown: () => {},
        Home: () => {},
        End: () => {},
      }

      const action = keyMap[eventKey]

      if (action) {
        event.preventDefault()
        action(event)
      }
    }

    const getStepFactor = <
      Event extends React.KeyboardEvent | React.WheelEvent | WheelEvent,
    >(
      event: Event,
    ) => {
      let ratio = 1
      if (event.metaKey || event.ctrlKey) {
        ratio = 0.1
      }
      if (event.shiftKey) {
        ratio = 10
      }
      return ratio
    }

    return (
      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
        type="number"
        ref={ref}
        onKeyDown={onKeyDown}
        {...props}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'

export { NumberInput }

import ColorHash from 'color-hash'
import { useMemo } from 'react'

const colorHash = new ColorHash({ saturation: 1.0 })

export const stringToColour = (s: string): string => colorHash.hex(s)

export const generateColours = (s: string): [string, string] => {
  const s1 = s.substring(0, s.length / 2)
  const s2 = s.substring(s.length / 2)
  const c1 = stringToColour(s1)
  const c2 = stringToColour(s2)

  return [c1, c2]
}

export interface GradientsAvatarProps {
  id?: string
  text: string
  size?: number
}

export function GradientsAvatar({
  id,
  text,
  size = 256,
}: GradientsAvatarProps) {
  const [c1, c2] = useMemo(() => generateColours(text), [text])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{text}</title>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={id ? `url(#gradient-${text}-${id})` : `url(#gradient-${text}`}
      />
      <defs>
        <linearGradient
          id={id ? `gradient-${text}-${id}` : `gradient-${text}`}
          x1="0"
          y1="0"
          x2={size}
          y2={size}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
    </svg>
  )
}

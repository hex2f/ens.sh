import type { PropsWithoutRef } from "react"
import { useTheme } from "~/contexts/ThemeContext"

export default function HeaderIcon ({ className }: PropsWithoutRef<{ className?: string }>) {
  const { dark } = useTheme()
  return (
        <svg width="798" height="794" viewBox="0 0 798 794" fill="none" xmlns="http://www.w3.org/2000/svg" className={className??"absolute top-3 left-3 z-20 h-10 w-10 opacity-90"}>
    <g>
        <path d="M590.041 164.515C616.907 156.234 642.08 181.407 633.798 208.273L558.48 452.603C550.713 477.8 518.929 485.685 500.285 467.041L331.273 298.029C312.628 279.384 320.514 247.6 345.711 239.833L590.041 164.515Z" fill={dark ? "white" : "black"}/>
        <path d="M208.273 629.208C181.406 637.49 156.233 612.317 164.515 585.451L239.833 341.121C247.6 315.924 279.384 308.038 298.029 326.682L467.041 495.695C485.685 514.339 477.8 546.123 452.602 553.89L208.273 629.208Z" stroke={dark ? "white" : "black"} stroke-width="6"/>
        <path d="M178.85 589.869L254.167 345.54C258.606 331.141 276.768 326.635 287.422 337.289L456.434 506.301C467.088 516.955 462.582 535.117 448.184 539.556L203.854 614.874C188.502 619.606 174.117 605.222 178.85 589.869Z" stroke={dark ? "white" : "black"} stroke-width="30"/>
      </g>
    </svg>

  )
}
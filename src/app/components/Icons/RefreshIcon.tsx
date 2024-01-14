import { IconSvgProps } from "../../types/types";

export const RefreshIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
<svg
viewBox="0 0 512 512"
fill="currentColor"
height="24"
width="24"
{...props}
>
<path
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeMiterlimit={10}
  strokeWidth={32}
  d="M320 146s24.36-12-64-12a160 160 0 10160 160"
/>
<path
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth={32}
  d="M256 58l80 80-80 80"
/>
</svg>
);

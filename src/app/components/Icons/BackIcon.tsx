// icon:eye | Ionicons https://ionicons.com/ | Ionic Framework
import { IconSvgProps } from "../../types/types";

const BackIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (

  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    height="1.5em"
    width="1.5em"
    {...props}
  >
    <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
  </svg>
);


export default BackIcon;

// icon:eye | Ionicons https://ionicons.com/ | Ionic Framework
import { IconSvgProps } from "../../types/types";

const DownloadIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (

    <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        height="1.5em"
        width="1.5em"
        {...props}
    >
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
        <path d="M7 11l5 5l5 -5" />
        <path d="M12 4l0 12" />
    </svg>
);


export default DownloadIcon;

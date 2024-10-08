// icon:eye | Ionicons https://ionicons.com/ | Ionic Framework
import { IconSvgProps } from "../../types/types";

const IconTick = ({ size = 24, width, height, ...props }: IconSvgProps) => (

    <svg
        baseProfile="tiny"
        viewBox="0 0 24 24"
        fill="currentColor"
        height="24"
        width="24"
        {...props}
    >
        <path d="M16.972 6.251a1.999 1.999 0 00-2.72.777l-3.713 6.682-2.125-2.125a2 2 0 10-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 001.471-1.009l5-9a2 2 0 00-.776-2.72z" />
    </svg>
);


export default IconTick;

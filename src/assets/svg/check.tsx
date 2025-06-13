import { SVGProps } from "react";

const CheckIcon = ({ width = 100, height = 100, ...props }: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 220"
        width={width}
        height={height}
        {...props}
    >
        <g id="Layer_2" data-name="Layer 2">
            <g id="background_invisible" data-name="background invisible">
                <rect width="240" height="240" fill="none" />
            </g>
            <g id="illustrations">
                <g>
                    <path d="M260,24.5a85.1,85.1,0,1,0,.8,0Z" fill="#1ac567" opacity="0.2" />
                    <path d="M260,38a71.7,71.7,0,1,0,.7,0Z" fill="#1ac567" opacity="0.45" />
                    <circle cx="259.1" cy="106.4" r="47.7" fill="#fff" />
                    <path
                        d="M260,50.6a59.2,59.2,0,1,0,.5,0Zm30.8,44.3L253,132.7a5.2,5.2,0,0,1-7.3.3l-.3-.3-15.9-15.9a6,6,0,0,1-1.1-7.3,5.3,5.3,0,0,1,7.5-1.3l.9.7,12.4,12.4,34-34a5.4,5.4,0,0,1,7.6,1.1A5.6,5.6,0,0,1,290.8,94.9Z"
                        fill="#1ac567"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default CheckIcon;

import React from "react";

export const RightArrow = (props?: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
<svg 
xmlns="http://www.w3.org/2000/svg" 
width="14" 
height="13.31" 
viewBox="0 0 24 24" 
fill="none" 
stroke="currentColor"
strokeWidth="2" 
{...props}
>
<path d="M5 12h14"/>
<path d="m12 5 7 7-7 7"/>
</svg>
);


export const Headphone = (props?: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
<svg 
xmlns="http://www.w3.org/2000/svg" 
width="24" 
height="24" 
viewBox="0 0 24 24" 
fill="none" 
stroke="currentColor"
strokeWidth="2" 
{...props}
>
<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
</svg>
);
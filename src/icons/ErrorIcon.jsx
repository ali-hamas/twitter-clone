import { cn } from "@/utils/cn";

const ErrorIcon = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24.00 24.00"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("stroke-secondryTxt size-10 fill-transparent", className)}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.09"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z"
          strokeWidth="1.6799999999999997"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 9V13"
          strokeWidth="1.6799999999999997"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 17.0195V17"
          strokeWidth="1.6799999999999997"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default ErrorIcon;

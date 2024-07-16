import { cn } from "@/utils/cn";
import { useNavigate } from "react-router-dom";

export const Header = ({ title, className, back = true }) => {
  const navigate = useNavigate();
  return (
    <header className="border-b-border bg-primaryBg/50 sticky top-0 z-10 flex w-full items-center gap-3 border-b px-4 py-2 shadow-sm backdrop-blur-md min-h-[53px]">
      {back && (
        <button tooltip="Back" onClick={() => navigate(-1)} className="transition-200 hover:bg-hoverBg cursor-pointer rounded-full p-2">
          <svg viewBox="0 0 24 24" className="fill-primaryTxt size-5">
            <g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" /></g>
          </svg>
        </button>
      )}
      <h1 className={cn("text-lg/6 font-black", className)}>{title}</h1>
    </header>
  );
};

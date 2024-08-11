import clsx from "clsx";
import { colors } from "../../styles/variables";
import { ElementType, ReactNode } from "react";

interface SwitchButtonProps {
  children: ReactNode
}
interface SwitchButtonIconProps { 
  icon: ElementType,
  actived: boolean,
  onClick?: () => void
}

export function SwitchButtonRoot({ children }: SwitchButtonProps) {
  return (
    <div className="w-20 h-[30px] rounded-full flex justify-center relative">
      {children}
    </div>
  );
}

export function SwitchButtonLeftIcon({ icon: Icon, actived, onClick }: SwitchButtonIconProps) {
  return (
    <div 
    onClick={onClick}
    className={clsx(
      "h-full w-6/12 rounded-l-full flex justify-center items-center cursor-pointer shadow-typo-700/60 transition-all",
      {
        "shadow-inner bg-main-red-300": actived,
        "hover:shadow-inner bg-typo-200": !actived
      }
    )}>
      <Icon size={20} color={
        actived ? colors.typo[100] : colors.typo[400]
      } />
    </div>
  );
}

export function SwitchButtonRightIcon({ icon: Icon, actived, onClick }: SwitchButtonIconProps) {
  return (
    <div 
    onClick={onClick}
    className={clsx(
      "h-[30px] w-6/12 rounded-r-full flex justify-center items-center cursor-pointer shadow-typo-700 transition-all",
      {
        "shadow-inner bg-main-red-300": actived,
        "hover:shadow-inner bg-typo-200": !actived
      }
    )}>
      <Icon size={20} color={
        actived ? colors.typo[100] : colors.typo[400]
      } />
    </div>
  );
}
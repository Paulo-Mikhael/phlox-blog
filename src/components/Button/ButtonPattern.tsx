import clsx from "clsx";
import { ElementType, ReactNode } from "react";

type Variant = "primary" | "outlined"

interface ButtonRootProps {
  variant?: Variant,
  disabled?: boolean,
  children: ReactNode,
  twWidth?: string,
  type?: "button" | "submit" | "reset" | undefined
}
interface ButtonTextProps{
  content: string,
  twFontWeight?: string
}
interface ButtonIconProps {
  icon: ElementType,
  size?: number
}

export function ButtonRoot({ variant = "primary", children, disabled = false, twWidth, type = "button" }: ButtonRootProps){
  return (
    <button 
      type={type}
      disabled={disabled}
      className={clsx(
        `rounded-[6px] text-normal px-[19px] py-[7px] border-[2px] focus:outline-none flex items-center justify-center gap-2 ${twWidth}`,
        {
          "border-transparent text-typo-100 bg-main-red-300 hover:bg-main-red-400 active:bg-main-red-200 focus:border-main-red-200 focus:bg-main-red-400": variant === "primary" && !disabled,
          "border-main-red-300 text-main-red-300 hover:text-main-red-500 active:text-typo-100 focus:bg-typo-200 active:bg-main-red-200 hover:border-main-red-500": variant === "outlined" && !disabled,
          "bg-typo-300 text-typo-100 cursor-not-allowed": variant === "primary" && disabled,
          "border-typo-300 text-typo-300 cursor-not-allowed": variant === "outlined" && disabled,
        }
    )}
    >
      {children}
    </button>
  )
}

export function ButtonText({ content, twFontWeight = "font-medium" }: ButtonTextProps){
  return (
    <span className={twFontWeight}>
      {content}
    </span>
  );
}

export function ButtonIcon({ icon: Icon, size }: ButtonIconProps) {
  return (
    <Icon size={size ? size : 18} />
  );
}
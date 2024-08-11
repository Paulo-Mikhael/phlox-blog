import clsx from "clsx";
import { useState } from "react";

interface BadgeProps {
  text?: string,
  twBackgroundColor?: string,
  removeButton?: boolean,
  pressed?: boolean,
  onPress?: () => void
}

export function Badge({ text, twBackgroundColor, removeButton = false, pressed = false, onPress }: BadgeProps) {
  const unpressedStyle = twBackgroundColor ? `${twBackgroundColor} shadow-md` : "bg-typo-700 shadow-md";
  const pressedStyle = "bg-typo-200 shadow-inner";
  const [handlePressed, setHandlePressed] = useState<boolean>(pressed);
  
  return (
    <div 
    onClick={() => {
      twBackgroundColor && removeButton && setHandlePressed(!handlePressed);
      onPress && onPress()
    }}
      className={
        `flex items-center justify-center py-[5px] p-5 rounded-full relative cursor-pointer transition-all shadow-typo-700/20 ${handlePressed ? pressedStyle : unpressedStyle} ${!text ? "w-20" : ""}`
      }
    >
      <span className={clsx(
        "bg-main-red-300 w-5 h-5 absolute -top-1 -right-1 rounded-full flex items-center justify-center",
        {
          "hidden": !removeButton
        }
      )}>
        <div className="bg-typo-200 w-3 h-[2px] absolute" />
        <div className={clsx(
          "bg-typo-200 w-3 h-[2px] absolute transition-all",
          {
            "rotate-0": !handlePressed && twBackgroundColor,
            "rotate-90": handlePressed || !twBackgroundColor
          }
        )} />
      </span>
      <p className={clsx(
        "text-typo-100 text-normal",
        {
          "text-typo-600": handlePressed
        }
      )}>
        {text}
      </p>
    </div>
  );
}
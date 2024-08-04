import clsx from "clsx";
import { createContext, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, useContext } from "react";

type TextFormInputVariant = "default" | "success" | "warning" | "danger" | "info" | "disabled"

interface TextFormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelText?: string
}
interface TextFormRootProps {
  hintText?: string,
  variant?: TextFormInputVariant,
  disabled?: boolean,
  children: ReactNode
}
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  twPaddingX?: string,
  twPaddingY?: string
}

const ThemeContext = createContext<{ variant?: TextFormInputVariant }>({});

export function TextFormRoot({ variant = "default", children, disabled }: TextFormRootProps) {
  disabled === true ? variant = "disabled" : variant
  return (
    <div className="flex flex-col gap-1">
      <ThemeContext.Provider value={{ variant }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
}

export function TextFormLabel({ labelText, ...rest }: TextFormLabelProps) {
  const { variant } = useContext(ThemeContext);

  return (
    <label
      {...rest}
      className={clsx(
        "text-normal font-medium",
        {
          "text-typo-600": variant === "default" || variant === "disabled",
          "text-feedback-success": variant === "success",
          "text-feedback-warning": variant === "warning",
          "text-feedback-danger": variant === "danger",
          "text-feedback-info": variant === "info",
        }
      )}
    >
      {labelText}
    </label>
  );
}

export function TextFormHint({ hintText }: { hintText: string }) {
  const { variant } = useContext(ThemeContext);

  return (
    <p className={clsx(
      "text-image-subtitle",
      {
        "text-typo-500": variant === "default" || variant === "disabled",
        "text-feedback-success": variant === "success",
        "text-feedback-warning": variant === "warning",
        "text-feedback-danger": variant === "danger",
        "text-feedback-info": variant === "info",
      }
    )}>
      {hintText}
    </p>
  );
}

export function TextFormInput({ twPaddingX = "px-[16px]", twPaddingY = "py-[10px]", ...rest }: TextInputProps) {
  const { variant } = useContext(ThemeContext);

  return (
    <div
      className={clsx(
        `${twPaddingX} ${twPaddingY} w-full border-[2px] rounded-[6px] border-typo-500`,
        {
          "text-typo-700 focus:border-main-red-200 caret-main-red-300": variant === "default",
          "text-feedback-success border-feedback-success": variant === "success",
          "text-feedback-warning border-feedback-warning": variant === "warning",
          "text-feedback-danger border-feedback-danger": variant === "danger",
          "text-feedback-info border-feedback-info": variant === "info",
          "border-typo-500 bg-typo-200": variant === "disabled"
        }
      )}
    >
      <input 
        {...rest}
        type="text" 
        disabled={variant === "disabled"}
        className="outline-none h-full w-[90%]"
      />
    </div>
  );
}
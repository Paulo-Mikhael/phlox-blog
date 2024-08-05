import clsx from "clsx";
import { createContext, ElementType, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, useContext } from "react";

type TextFormInputVariant = "default" | "success" | "warning" | "danger" | "info" | "disabled"

interface TextFormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelText?: string
}
interface TextFormRootProps {
  hintText?: string,
  variant?: TextFormInputVariant,
  disabled?: boolean,
  twWidth?: string,
  children: ReactNode
}
interface TextFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  twPaddingX?: string,
  twPaddingY?: string,
  iconLeft?: ElementType,
  iconRight?: ElementType
}
interface TextFormInputIcon {
  icon: ElementType,
  size?: number,
  color?: string
}

const VariantContext = createContext<{ variant?: TextFormInputVariant }>({});

export function TextFormRoot({ variant = "default", children, disabled, twWidth = "w-full" }: TextFormRootProps) {
  disabled === true ? variant = "disabled" : variant
  return (
    <div className={`flex flex-col gap-1 ${twWidth}`}>
      <VariantContext.Provider value={{ variant }}>
        {children}
      </VariantContext.Provider>
    </div>
  );
}

export function TextFormLabel({ labelText, ...rest }: TextFormLabelProps) {
  const { variant } = useContext(VariantContext);

  return (
    <label
      {...rest}
      className={clsx(
        "text-normal font-medium",
        {
          "text-typo-600": variant === "default",
          "text-feedback-success": variant === "success",
          "text-feedback-warning": variant === "warning",
          "text-feedback-danger": variant === "danger",
          "text-feedback-info": variant === "info",
          "text-typo-600 cursor-not-allowed": variant === "disabled"
        }
      )}
    >
      {labelText}
    </label>
  );
}

export function TextFormHint({ hintText }: { hintText: string }) {
  const { variant } = useContext(VariantContext);

  return (
    <p className={clsx(
      "text-image-subtitle",
      {
        "text-typo-500": variant === "default" || variant === "disabled",
        "text-feedback-success": variant === "success",
        "text-feedback-warning": variant === "warning",
        "text-feedback-danger": variant === "danger",
        "text-feedback-info": variant === "info",
        "text-typo-500 cursor-not-allowed": variant === "disabled"
      }
    )}>
      {hintText}
    </p>
  );
}

export function TextFormInput({ twPaddingX = "px-[16px]", twPaddingY = "py-[10px]", iconLeft: IconLeft, iconRight: IconRight, ...rest }: TextFormInputProps) {
  const { variant } = useContext(VariantContext);

  return (
    <div
      className={clsx(
        `${twPaddingX} ${twPaddingY} w-full border-[2px] rounded-[6px] flex gap-4 justify-between`,
        {
          "text-typo-700 border-typo-500 focus-within:border-main-red-200 caret-main-red-300": variant === "default",
          "text-feedback-success border-feedback-success": variant === "success",
          "text-feedback-warning border-feedback-warning": variant === "warning",
          "text-feedback-danger border-feedback-danger": variant === "danger",
          "text-feedback-info border-feedback-info": variant === "info",
          "border-typo-500 bg-typo-200 cursor-not-allowed": variant === "disabled"
        }
      )}
    >
      {IconLeft && <TextFormInputIcon icon={IconLeft} />}
      <input 
        {...rest}
        type="text" 
        disabled={variant === "disabled"}
        className="outline-none h-full w-full bg-transparent"
      />
      {IconRight && <TextFormInputIcon icon={IconRight} />}
    </div>
  );
}

function TextFormInputIcon({ icon: Icon, size = 20 }: TextFormInputIcon) {
  const { variant } = useContext(VariantContext)

  return (
    <Icon 
      size={size}
      className={clsx(
        {
          "text-main-red-300": variant === "default",
          "text-feedback-success": variant === "success",
          "text-feedback-warning": variant === "warning",
          "text-feedback-danger": variant === "danger",
          "text-feedback-info": variant === "info",
          "text-typo-500": variant === "disabled"
        }
      )}
   />
  );
}
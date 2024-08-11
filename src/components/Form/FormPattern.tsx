import clsx from "clsx";
import { createContext, ElementType, FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, useContext } from "react";
import { StyledInput } from "../../utils/StyledInput";

type FormInputVariant = "default" | "success" | "warning" | "danger" | "info" | "disabled"

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text?: string
}
interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {
  hintText?: string,
  variant?: FormInputVariant,
  disabled?: boolean,
  twWidth?: string,
  children: ReactNode
}
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  twPaddingX?: string,
  twPaddingY?: string,
  iconLeft?: ElementType,
  iconRight?: ElementType,
  type?: React.HTMLInputTypeAttribute
}
interface FormInputIcon {
  icon: ElementType,
  size?: number,
  color?: string
}

const VariantContext = createContext<{ variant?: FormInputVariant }>({});

export function FormRoot({ variant = "default", children, disabled, twWidth = "w-full", ...rest }: FormRootProps) {
  disabled === true ? variant = "disabled" : variant
  return (
    <form className={`flex flex-col gap-1 ${twWidth} ${rest}`}>
      <VariantContext.Provider value={{ variant }}>
        {children}
      </VariantContext.Provider>
    </form>
  );
}

export function FormLabel({ text, ...rest }: FormLabelProps) {
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
      {text}
    </label>
  );
}

export function FormHint({ hintText }: { hintText: string }) {
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

export function FormInput({ twPaddingX = "px-[16px]", twPaddingY = "py-[10px]", iconLeft: IconLeft, iconRight: IconRight, type = "text", ...rest }: FormInputProps) {
  const { variant } = useContext(VariantContext);

  return (
    <div
      className={clsx(
        `${twPaddingX} ${twPaddingY} w-full border-[2px] rounded-[6px] flex gap-4 justify-between bg-typo-100 items-center ${rest.className}`,
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
      {IconLeft && <FormInputIcon icon={IconLeft} />}
      <StyledInput 
        className={`outline-none h-full w-full text-normal bg-transparent ${variant === "disabled" ? "cursor-not-allowed" : "cursor-text"}`}
        {...rest}
        type={type}
        disabled={variant === "disabled"}
      />
      {IconRight && <FormInputIcon icon={IconRight} />}
    </div>
  );
}

function FormInputIcon({ icon: Icon, size = 20 }: FormInputIcon) {
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
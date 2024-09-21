import clsx from "clsx";
import {
  createContext,
  ElementType,
  FormHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useContext,
} from "react";
import { StyledInput } from "../../styles/StyledInput";
import { CalendarModal } from "../CalendarModal";
import { useModalValue } from "../../state/hooks/useModalValue";
import { useRecoilValue } from "recoil";
import { postsFilterState } from "../../state/atom";
import { useSetPostFilterDate } from "../../state/hooks/useSetFilterPostDate";

type FormInputVariant = "default" | "success" | "warning" | "danger" | "info" | "disabled";

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}
interface FormRootProps extends FormHTMLAttributes<HTMLFormElement> {
  hintText?: string;
  variant?: FormInputVariant;
  disabled?: boolean;
  twWidth?: string;
  twFlexDirection?: string;
  children: ReactNode;
}
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  twPaddingX?: string;
  twPaddingY?: string;
  iconLeft?: ElementType;
  iconRight?: ElementType;
  type?: React.HTMLInputTypeAttribute;
  textarea?: boolean;
  onChangeTextarea?: React.ChangeEventHandler<HTMLTextAreaElement>;
  twMinHeightTextArea?: string;
  children?: ReactNode;
}
interface FormInputIcon {
  icon: ElementType;
  size?: number;
  onClick?: () => void;
  absolute?: boolean;
}

const VariantContext = createContext<{ variant?: FormInputVariant }>({});

export function FormRoot({
  variant = "default",
  children,
  disabled,
  twWidth = "w-full",
  twFlexDirection = "flex-col",
  ...rest
}: FormRootProps) {
  disabled === true ? (variant = "disabled") : variant;
  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        rest.onSubmit && rest.onSubmit(evt);
      }}
      className={`flex ${twFlexDirection} gap-1 ${twWidth} ${rest.className}`}
    >
      <VariantContext.Provider value={{ variant }}>{children}</VariantContext.Provider>
    </form>
  );
}

export function FormLabel({ text, ...rest }: FormLabelProps) {
  const { variant } = useContext(VariantContext);

  return (
    <label
      {...rest}
      className={clsx(`text-normal font-medium mt-3 ${rest.className}`, {
        "text-typo-600": variant === "default" || variant === undefined,
        "text-feedback-success": variant === "success",
        "text-feedback-warning": variant === "warning",
        "text-feedback-danger": variant === "danger",
        "text-feedback-info": variant === "info",
        "text-typo-600 cursor-not-allowed": variant === "disabled",
      })}
    >
      {text}
    </label>
  );
}

export function FormHint({ hintText, className }: { hintText: string; className?: string }) {
  const { variant } = useContext(VariantContext);

  return (
    <p
      className={clsx(`text-image-subtitle ${className}`, {
        "text-typo-500": variant === "default" || variant === "disabled",
        "text-feedback-success": variant === "success",
        "text-feedback-warning": variant === "warning",
        "text-feedback-danger": variant === "danger",
        "text-feedback-info": variant === "info",
        "text-typo-500 cursor-not-allowed": variant === "disabled",
      })}
    >
      {hintText}
    </p>
  );
}

export function FormInput({
  twPaddingX = "px-[16px]",
  twPaddingY = "py-[10px]",
  iconLeft: IconLeft,
  iconRight: IconRight,
  type = "text",
  textarea,
  onChangeTextarea,
  children,
  ...rest
}: FormInputProps) {
  const { variant } = useContext(VariantContext);

  const textareaEventWarnText =
    "Para acessar o evento onChange do textarea, use o parâmetro 'onChangeTextarea'";
  const textareaWarnText =
    "Para usar o parâmetro 'onChangeTextarea', deve-se passar o parâmetro 'textarea' como true";
  rest.onChange && textarea && console.log(textareaEventWarnText);
  onChangeTextarea && !textarea && console.log(textareaWarnText);

  return (
    <div
      className={clsx(
        `${twPaddingX} ${twPaddingY} w-full rounded-[6px] flex gap-4 justify-between items-center bg-typo-100 ${rest.className}`,
        {
          "text-typo-700 border-typo-500 focus-within:border-main-red-200 caret-main-red-300":
            variant === "default",
          "text-feedback-success border-feedback-success": variant === "success",
          "text-feedback-warning border-feedback-warning": variant === "warning",
          "text-feedback-danger border-feedback-danger": variant === "danger",
          "text-feedback-info border-feedback-info": variant === "info",
          "border-typo-500 bg-typo-200 cursor-not-allowed": variant === "disabled",
          "border-[2px]": type !== "file",
        }
      )}
    >
      {IconLeft && <FormInputIcon icon={IconLeft} />}
      {(type === "text" || type === "password") && !textarea && (
        <StyledInput
          className={`outline-none h-full w-full text-normal bg-transparent ${variant === "disabled" ? "cursor-not-allowed" : "cursor-text"}`}
          type={type}
          disabled={variant === "disabled"}
          {...rest}
        />
      )}
      {type === "text" && textarea && (
        <textarea
          className={`outline-none ${rest.twMinHeightTextArea} w-full text-normal bg-transparent scrollbar scrollbar-none ${variant === "disabled" ? "cursor-not-allowed" : "cursor-text"}`}
          disabled={variant === "disabled"}
          onChange={onChangeTextarea}
          value={rest.value}
          placeholder={rest.placeholder}
        />
      )}
      {type === "file" && (
        <StyledInput
          type={type}
          className="bg-white file-input-xs file-input-bordered file-input-error file-input w-full"
          {...rest}
        />
      )}
      {type === "date" && <DateInput {...rest} />}
      {IconRight && !children && <FormInputIcon icon={IconRight} />}
      {children}
    </div>
  );
}

export function FormInputIcon({ icon: Icon, size = 20, onClick, absolute }: FormInputIcon) {
  const { variant } = useContext(VariantContext);

  return (
    <Icon
      onClick={onClick}
      size={size}
      className={clsx(`${onClick ? "cursor-pointer" : "cursor-default"}`, {
        "absolute top-2 right-2 bg-typo-100 rounded-full p-1 size-8": absolute,
        "text-main-red-300": variant === "default",
        "text-feedback-success": variant === "success",
        "text-feedback-warning": variant === "warning",
        "text-feedback-danger": variant === "danger",
        "text-feedback-info": variant === "info",
        "text-typo-500": variant === "disabled",
      })}
    />
  );
}

function DateInput({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const calendarOpened = useModalValue("OCM");
  const filterDate = useRecoilValue(postsFilterState);
  const setFilterDate = useSetPostFilterDate();
  const { variant } = useContext(VariantContext);

  return (
    <>
      <span className="relative w-full">
        <StyledInput
          disabled={variant === "disabled"}
          type="date"
          value={filterDate.postDate ? filterDate.postDate : ""}
          className={clsx("bg-transparent w-full text-normal", {
            "cursor-not-allowed": variant === "disabled",
            "cursor-default": variant !== "disabled",
          })}
          {...rest}
          onChange={(evt) => {
            setFilterDate(evt.target.value);
          }}
        />
      </span>
      {calendarOpened && <CalendarModal />}
    </>
  );
}

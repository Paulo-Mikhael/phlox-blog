import clsx from "clsx";
import { createContext, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, useContext } from "react";

interface CheckboxRootProps {
  children: ReactNode,
  twWidth?: string,
  disabled?: boolean
}
interface CheckboxLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelText: string,
  htmlFor: string
}
interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
}

const DisabledContext = createContext<boolean>(false);

export function CheckboxRoot({ children, twWidth = "w-full", disabled = false }: CheckboxRootProps) {
  return (
    <div className={`${twWidth} flex items-center gap-2`}>
      <DisabledContext.Provider value={disabled}>
        {children}
      </DisabledContext.Provider>
    </div>
  );
}

export function CheckboxInput({ id }: CheckboxInputProps) {
  const disabled = useContext(DisabledContext);

  return (
    <input
      id={id}
      type="checkbox"
      defaultChecked
      disabled={disabled}
      // Mudar o valor de --chkbg por template string não está funcionando por algum motivo
      className={clsx(
        "checkbox rounded-[6px]",
        {
          "[--chkbg:#FB2A36] [--chkfg:#fff]": !disabled,
          "[--chkbg:#BABABA] [--chkfg:#fff]": disabled
        }
      )}
    />
  );
}

export function CheckboxLabel({ labelText, htmlFor }: CheckboxLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="cursor-pointer"
    >
      {labelText}
    </label>
  );
}
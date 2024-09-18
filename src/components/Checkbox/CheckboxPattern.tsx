import clsx from "clsx";
import { createContext, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, useContext, useState } from "react";

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
  id: string,
  onCheck?: () => void,
  onUnCheck?: () => void
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

export function CheckboxInput({ id, onCheck, onUnCheck }: CheckboxInputProps) {
  const disabled = useContext(DisabledContext);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <input
      id={id}
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onClick={() => {
        setChecked(!checked);
        !checked && onCheck && onCheck();
        checked && onUnCheck && onUnCheck();
      }}
      // Mudar o valor de --chkbg por template string não está funcionando por algum motivo
      className={clsx(
        "checkbox rounded-[6px] border-typo-500",
        {
          "[--chkbg:#FB2A36] [--chkfg:#fff]": !disabled,
          "[--chkbg:#BABABA] [--chkfg:#fff] border-typo-300": disabled
        }
      )}
    />
  );
}

export function CheckboxLabel({ labelText, htmlFor }: CheckboxLabelProps) {
  const disabled = useContext(DisabledContext)

  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        {
          "cursor-pointer text-typo-700": !disabled,
          "cursor-not-allowed text-typo-400 border-typo-300": disabled
        }
      )}
    >
      {labelText}
    </label>
  );
}
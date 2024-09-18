import clsx from "clsx";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { colors } from "../../styles/variables";
import { useModalValue } from "../../state/hooks/useModalValue";
import { useSetModalValue } from "../../state/hooks/useSetModalValue";

interface ModalProps {
  children: ReactNode,
  onClose?: () => void,
  modalKey: string
}

export function Modal({ children, onClose, modalKey }: ModalProps) {
  const openModal = useModalValue(modalKey);
  const setOpenModal = useSetModalValue(modalKey);

  return (
    <div
      className={clsx(
        "fixed bg-typo-700/20 w-full h-full top-0 left-0 items-center justify-center z-10",
        {
          "hidden": !openModal,
          "flex": openModal
        }
      )}
    >
      <div className="relative p-6 bg-typo-100 rounded-[10px] min-w-80">
        <span
          className="rounded-full bg-main-red-300 p-2 flex items-center justify-center absolute -top-3 -right-3 cursor-pointer z-20"
          onClick={() => {
            setOpenModal(false);
            onClose && onClose();
          }}
        >
          <X
            color={colors.typo[100]}
          />
        </span>
        {children}
      </div>
    </div>
  );
}
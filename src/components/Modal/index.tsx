import clsx from "clsx";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { colors } from "../../styles/variables";

interface ModalProps {
  children: ReactNode,
  onClose?: () => void,
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function Modal({ children, onClose, openModal, setOpenModal }: ModalProps) {

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
        {children}
        <span
          className="rounded-full bg-main-red-300 p-2 flex items-center justify-center absolute -top-3 -right-3 cursor-pointer"
          onClick={() => {
            setOpenModal(false);
            onClose && onClose();
          }}
        >
          <X
            color={colors.typo[100]}
          />
        </span>
      </div>
    </div>
  );
}
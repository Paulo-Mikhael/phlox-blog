import { Bookmark, BookmarkCheck } from "lucide-react";
import { colors } from "../../styles/variables";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../../state/atom";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { Form } from "../Form";
import { Link } from "react-router-dom";

interface UserCardRootProps {
  children: ReactNode,
  variant?: "transparent" | "bordered"
}
interface UserCardHandleMarkProps {
  marked: boolean,
  onClick?: () => void
}
interface UserCardInfosProps {
  userName: string,
  userPostsNumber: number | undefined,
  userAvatar: string,
  onClick?: () => void
}

export function UserCardRoot({ children, variant = "transparent" }: UserCardRootProps) {
  return (
    <span
      className={clsx(
        "w-full h-[66px] flex justify-between items-center",
        {
          "p-3 border-main-red-300 border-[2px] rounded-[6px] shadow-inner shadow-typo-700/70 ": variant === "bordered"
        }
      )}
    >
      {children}
    </span>
  );
}

export function UserCardHandleMark({ marked, onClick }: UserCardHandleMarkProps) {
  const [handleMarked, setHandleMarked] = useState<boolean>(marked);
  const Icon = handleMarked ? BookmarkCheck : Bookmark;
  const actualUser = useRecoilValue(actualUserState);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Icon
        className="cursor-pointer"
        color={colors.redMain[300]} size={26}
        onClick={() => {
          if (actualUser) {
            setHandleMarked(!handleMarked);
            onClick && onClick();
          } else {
            setOpenModal(true);
          }
        }}
      />
      {openModal && (
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          <Form.Root className="gap-4">
            <Form.Label className="max-w-64 text-center" text="Para favoritar usuários você precisa estar logado na plataforma" />
            <div className="flex justify-between">
              <Button.Root>
                <Link to="/login">
                  <Button.Text content="Fazer login" />
                </Link>
              </Button.Root>
              <Button.Root variant="outlined">
                <Link to="/signup">
                  <Button.Text content="Cadastrar-se" />
                </Link>
              </Button.Root>
            </div>
          </Form.Root>
        </Modal>
      )}
    </>
  );
}

export function UserCardInfos({ userName, userPostsNumber, userAvatar, onClick }: UserCardInfosProps) {
  return (
    <div
      className={clsx(
        "flex items-center h-full gap-[10px]",
        {
          "cursor-pointer": onClick
        }
      )}
      onClick={onClick}
    >
      <img className="w-[39px] h-[39px] rounded-full border-main-red-300 border" src={userAvatar} alt="" />
      <span>
        <h3 className="text-image-subtitle font-bold text-typo-700">
          {`${userName.slice(0, 21)}${userName.length > 21 ? "..." : ""}`}
        </h3>
        <h4 className="text-image-subtitle text-typo-700">
          {`${userPostsNumber ? userPostsNumber : 0} Posts`}
        </h4>
      </span>
    </div>
  );
}
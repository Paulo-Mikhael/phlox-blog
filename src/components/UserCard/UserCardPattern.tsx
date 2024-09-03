import { Bookmark, BookmarkCheck, LoaderCircle } from "lucide-react";
import { colors } from "../../styles/variables";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../../state/atom";
import { LoginModal } from "./LoginModal";
import { createInDataBase } from "../../utils/firebase/functions/createInDatabase";
import { useSetModalValue } from "../../state/hooks/useSetModalValue";
import { getUsers } from "../../utils/getUsers";
import { useSetUsers } from "../../state/hooks/useSetUsers";

interface UserCardRootProps {
  children: ReactNode,
  variant?: "transparent" | "bordered"
}
interface UserCardHandleMarkProps {
  marked: boolean,
  onClick?: () => void,
  userId?: string | undefined
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

export function UserCardHandleMark({ marked, onClick, userId }: UserCardHandleMarkProps) {
  const [handleMarked, setHandleMarked] = useState<boolean>(marked);
  const [loading, setLoading] = useState<boolean>(false);
  const Icon = handleMarked ? BookmarkCheck : Bookmark;
  const actualUser = useRecoilValue(actualUserState);
  const setOpenModalLM = useSetModalValue("LM");

  if (loading) return <LoaderCircle color={colors.redMain[300]} className="animate-spin" size={26} />;

  return (
    <>
      <Icon
        className="cursor-pointer"
        color={colors.redMain[300]} 
        size={26}
        onClick={() => {
          if (actualUser && actualUser.data.id && userId) {
            setLoading(true);
            createInDataBase.UserFavorite(actualUser.data.id, userId, !handleMarked)
              .then(() => {
                setHandleMarked(!handleMarked);
                setLoading(false);
              })
              .catch((err) => {
                throw new Error(err);
              });
            onClick && onClick();
          } else {
            setOpenModalLM(true);
          }
        }}
      />
      <LoginModal />
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
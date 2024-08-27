import { Bookmark, BookmarkCheck } from "lucide-react";
import { colors } from "../../styles/variables";
import { ReactNode, useState } from "react";
import clsx from "clsx";

export function UserCardRoot({ children, onClick, variant = "transparent" }: { children: ReactNode, onClick?: () => void, variant?: "transparent" | "bordered" }) {
  return (
    <span
      className={clsx(
        "w-full h-[66px] flex justify-between items-center",
        {
          "p-3 border-main-red-300 border-[2px] rounded-[6px] shadow-inner shadow-typo-700/70 ": variant === "bordered"
        }
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export function UserCardHandleMark(
  { marked, onClick }: { marked: boolean, onClick?: () => void }
) {
  const [handleMarked, setHandleMarked] = useState<boolean>(marked);
  const Icon = handleMarked ? BookmarkCheck : Bookmark;

  return (
    <Icon
      className="cursor-pointer" color={colors.redMain[300]} size={26}
      onClick={() => {
        setHandleMarked(!handleMarked);
        onClick && onClick();
      }}
    />
  );
}

export function UserCardInfos({ userName, userPostsNumber, userAvatar }: { userName: string, userPostsNumber: number, userAvatar: string }) {
  return (
    <div className="flex items-center h-full gap-[10px]">
      <img className="w-[39px] h-[39px] rounded-full border-main-red-300 border" src={userAvatar} alt="" />
      <span>
        <h3 className="text-image-subtitle font-bold text-typo-700">
          {userName}
        </h3>
        <h4 className="text-image-subtitle text-typo-700">
          {`${userPostsNumber} Posts`}
        </h4>
      </span>
    </div>
  );
}
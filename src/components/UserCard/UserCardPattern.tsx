import { Bookmark, BookmarkCheck } from "lucide-react";
import { colors } from "../../styles/variables";
import { ReactNode, useState } from "react";

export function UserCardRoot({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
  return (
    <span 
      className="w-full h-[66px] flex justify-between items-center"
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export function UserCardHandleMark(
  { marked, markOnClick, children, onClick }: { marked: boolean, markOnClick?: () => void, children: ReactNode, onClick?: () => void }
) {
  const [handleMarked, setHandleMarked] = useState<boolean>(marked);
  const Icon = handleMarked ? BookmarkCheck : Bookmark;

  return (
    <span 
      className="w-full h-[66px] p-3 border-main-red-300 border-[2px] rounded-[6px] shadow-inner shadow-typo-700/70 flex justify-between items-center"
      onClick={onClick}
    >
      {children}
      <Icon 
        className="cursor-pointer" color={colors.redMain[300]} size={26}
        onClick={() => {
          setHandleMarked(!handleMarked);
          markOnClick && markOnClick();
        }}
      />
    </span>
  );
}

export function UserCardInfos({ userName, userPostsNumber, userAvatar }: { userName: string, userPostsNumber: number, userAvatar: string }) {
  return (
    <div className="flex items-center h-full gap-[10px]">
      <img className="w-[39px] h-[39px] rounded-full border-main-red-300 border" src={userAvatar} alt="" />
      <span>
        <h3 className="text-image-subtitle font-bold text-typo-700">
          { userName }
        </h3>
        <h4 className="text-image-subtitle text-typo-700">
          { `${userPostsNumber} Posts` }
        </h4>
      </span>
    </div>
  );
}
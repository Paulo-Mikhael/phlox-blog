import { Bookmark, BookmarkCheck } from "lucide-react";
import { colors } from "../../styles/variables";

export function UserCard({ marked }: { marked: boolean }){
  return (
    <span className="w-full h-[66px] p-3 border-main-red-300 border-[2px] rounded-[6px] shadow-inner shadow-typo-700/70 flex justify-between items-center">
      <div className="flex items-center h-full gap-[10px]">
        <img className="w-[39px] h-[39px] rounded-full border-main-red-300 border" src="images/user.png" alt="" />
        <span>
          <h3 className="text-image-subtitle font-bold text-typo-700">Usuário</h3>
          <h4 className="text-image-subtitle text-typo-700">0 Posts</h4>
        </span>
      </div>
      {marked 
      ? <BookmarkCheck className="cursor-pointer" color={colors.redMain[300]} size={26} /> 
      : <Bookmark className="cursor-pointer" color={colors.redMain[300]} size={26} /> }
    </span>
  );
}
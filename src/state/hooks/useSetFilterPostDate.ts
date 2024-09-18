import { useSetRecoilState } from "recoil"
import { postsFilterState } from "../atom";

export function useSetPostFilterDate(){
  const setPostFilter = useSetRecoilState(postsFilterState);

  return (date: string | null) => {
    setPostFilter((prv) => ({
      ...prv,
      postDate: date
    }));
  }
}
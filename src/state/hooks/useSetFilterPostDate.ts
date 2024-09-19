import { useSetRecoilState } from "recoil"
import { postsFilterState } from "../atom";

export function useSetPostFilterDate(){
  const setPostFilter = useSetRecoilState(postsFilterState);

  return (date: string | undefined) => {
    setPostFilter((prv) => ({
      ...prv,
      postDate: date
    }));
  }
}
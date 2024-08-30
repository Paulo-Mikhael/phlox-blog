import { useSetRecoilState } from "recoil";
import { postsFilterState } from "../atom";

export function useSetFilterPostTitle(): (postTitle: string) => void{
  const setFilter = useSetRecoilState(postsFilterState);
  
  return (postTitle: string) => {
    setFilter(prv => {
      const newFilter =  {
        ...prv,
        postTitle: postTitle
      }

      return newFilter;
    });
  }
}
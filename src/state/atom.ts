import { atom } from "recoil";
import { IPost, IPostBadges } from "../interfaces/IPost";
import { User } from "firebase/auth";
import { IUser } from "../interfaces/IUser";

export const postsState = atom<IPost[]>({
  key: "postsState",
  default: []
});

export const handleBadgeItems = atom<IPostBadges>({
  key: "handleBadgeItems",
  default: {
    defaultBadges: {
      storyPressed: false,
      tecnologyPressed: false,
      newsPressed: false,
      programationPressed: false,
      opportunityPressed: false,
      offerPressed: false,
    },
    personalizedBadges: []
  }
});

export const actualUser = atom<{ auth: User | null, data: IUser } | null>({
  key: "actualUser",
  default: null
});
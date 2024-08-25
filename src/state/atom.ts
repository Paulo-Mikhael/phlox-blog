import { atom } from "recoil";
import { IPost, IPostBadges } from "../interfaces/IPost";
import { postsAsync } from "./selectors";
import { User } from "firebase/auth";

export const postsState = atom<IPost[]>({
  key: "postsState",
  default: postsAsync
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

export const actualUser = atom<User | null>({
  key: "actualUser",
  default: null
});
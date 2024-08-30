import { atom } from "recoil";
import { IPost, IPostBadges } from "../interfaces/IPost";
import { User } from "firebase/auth";
import { IUser } from "../interfaces/IUser";
import { IPostFilter } from "../interfaces/IPostFilter";

export const postsState = atom<IPost[]>({
  key: "postsState",
  default: []
});

export const usersState = atom<IUser[]>({
  key: "usersState",
  default: []
});

export const handleBadgeItemsState = atom<IPostBadges>({
  key: "handleBadgeItemsState",
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

export const actualUserState = atom<{ auth: User | null, data: IUser } | null>({
  key: "actualUserState",
  default: null
});

export const postCardFormatState = atom<"table" | "list">({
  key: "postCardFormatState",
  default: "table"
});

export const postsFilterState = atom<IPostFilter | null>({
  key: "postsFilterState",
  default: { postTitle: "" }
});
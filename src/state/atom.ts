import { atom } from "recoil";
import { IPost, IPostBadges } from "../interfaces/IPost";
import { IUser } from "../interfaces/IUser";
import { IPostFilter } from "../interfaces/IPostFilter";
import { IUserFilter } from "../interfaces/IUsersFilter";
import { IActualUser } from "../interfaces/IActualUser";

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

export const actualUserState = atom<IActualUser | null>({
  key: "actualUserState",
  default: null
});

export const postCardFormatState = atom<"table" | "list">({
  key: "postCardFormatState",
  default: "table"
});

export const postsFilterState = atom<IPostFilter>({
  key: "postsFilterState",
  default: { postTitle: "", postDate: undefined }
});

export const usersFilterState = atom<IUserFilter>({
  key: "usersFilterState",
  default: { userEmail: "" }
});

export const modalsState = atom<{ key: string, opened: boolean }[]>({
  key: "modalsState",
  default: []
});
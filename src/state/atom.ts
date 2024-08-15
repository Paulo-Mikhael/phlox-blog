import { atom } from "recoil";
import { IPostBadges } from "../interfaces/IPost";

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
import { useRecoilValue } from "recoil";
import { handleBadgeItemsState } from "../state/atom";
import { IPost } from "../interfaces/IPost";
import { normalizeText } from "./normalizeText";

export function postsFilteredByBadges(postsArray: IPost[]) {
  const handleBadges = useRecoilValue(handleBadgeItemsState);
  const handleNewsPressed = handleBadges.defaultBadges.newsPressed;
  const handleStoryPressed = handleBadges.defaultBadges.storyPressed;
  const handleOpportunityPressed = handleBadges.defaultBadges.opportunityPressed;
  const handleTecnologyPressed = handleBadges.defaultBadges.tecnologyPressed;
  const handleProgramationPressed = handleBadges.defaultBadges.programationPressed;
  const handleOfferPressed = handleBadges.defaultBadges.offerPressed;
  const handlePersonalizedBagdges = handleBadges.personalizedBadges;

  const requiredBadges: string[] = [];

  for (let i = 0; i < handlePersonalizedBagdges.length; i++) {
    const badgeTitle = handlePersonalizedBagdges[i].pressed === false ? handlePersonalizedBagdges[i].title : "";

    if (badgeTitle !== "") {
      requiredBadges.push(normalizeText(badgeTitle));
    }
  };

  let filteredPosts = [
    ...postsArray
  ]

  filteredPosts = filteredPosts.filter((item) => {
    const condition = item.badges.defaultBadges.newsPressed === handleNewsPressed;

    return condition || handleNewsPressed === false;
  });
  filteredPosts = filteredPosts.filter((item) => {
    const condition = item.badges.defaultBadges.offerPressed === handleOfferPressed;

    return condition || handleOfferPressed === false;
  });
  filteredPosts = filteredPosts.filter((item) => {
    const condition = item.badges.defaultBadges.tecnologyPressed === handleTecnologyPressed;

    return condition || handleTecnologyPressed === false;
  });
  filteredPosts = filteredPosts.filter((item) => {
    const condition = item.badges.defaultBadges.programationPressed === handleProgramationPressed;

    return condition || handleProgramationPressed === false;
  });
  filteredPosts = filteredPosts.filter((item) => {
    const condition = item.badges.defaultBadges.opportunityPressed === handleOpportunityPressed;

    return condition || handleOpportunityPressed === false;
  });
  filteredPosts = filteredPosts.filter((item) => {
    const condition = item.badges.defaultBadges.storyPressed === handleStoryPressed;

    return condition || handleStoryPressed === false;
  });

  if (handlePersonalizedBagdges.length > 0) {
    filteredPosts = filteredPosts.filter((item) => {
      for (let i = 0; i < requiredBadges.length; i++) {
        const condition = item.badges.personalizedBadges.find((item) => normalizeText(item.title) === requiredBadges[i]);

        console.log(item);
        if (condition) {
          return true;
        }
      };

      return false;
    });
  };

  return filteredPosts;
}
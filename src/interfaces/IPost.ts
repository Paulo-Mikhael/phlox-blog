import { IPersonalizedBadge } from "./IBadge"

export interface IPost {
  id: string, // No firebase, o id é o index, na hora de pegar os dados deve-se colocar o index neste campo
  imageUrl: string,
  imageAlt?: string,
  title: string,
  content: string,
  postDate: string,
  userAuthorId: string,
  badges: IPostBadges
}

export interface IPostBadges {
  defaultBadges: {
    storyPressed: boolean,
    tecnologyPressed: boolean,
    newsPressed: boolean,
    programationPressed: boolean,
    opportunityPressed: boolean,
    offerPressed: boolean,
  },
  personalizedBadges: IPersonalizedBadge[]
}
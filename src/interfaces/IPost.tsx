import { IPersonalizedBadge } from "./IBadge"

export interface IPost {
  id: string,
  image: string,
  imageAlt?: string,
  title: string,
  content: string,
  postDate: Date,
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
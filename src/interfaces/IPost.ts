import { IPersonalizedBadge } from "./IBadge"

export interface IPost {
  id: string,
  imageUrl: string,
  imageAlt?: string,
  title: string,
  content: string,
  postDate: string,
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

export interface IImage {
  id: string,
  base64String: string
}
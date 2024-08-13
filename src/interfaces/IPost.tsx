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
  items: {
    story: boolean,
    tecnology: boolean,
    news: boolean,
    programation: boolean,
    opportunity: boolean,
    offer: boolean,
    personalized: string[]
  }
}
import { IPost } from "./IPost";

export interface IUser {
  id?: string, // No firebase, o id é o index, na hora de pegar os dados deve-se colocar o index neste campo
  email: string,
  avatarUrl?: string,
  posts?: IPost[],
  postsNumber?: number,
  usersFavorited?: boolean
}
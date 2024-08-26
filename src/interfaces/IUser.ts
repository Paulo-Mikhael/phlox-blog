import { IPost } from "./IPost";

export interface IUser {
  userId?: string, // No firebase, o id é o index, na hora de pegar os dados deve-se colocar o index neste campo
  userEmail: string,
  userAvatarUrl?: string,
  userPosts?: IPost[]
}
import { http } from "../http";
import { IImage } from "../interfaces/IPost";

export async function getFromImageUrl(postImageUrl: string){
  let imageBase64 = "";
  
    await http.get<IImage>(postImageUrl)
    .then((response) => {
      imageBase64 = response.data.base64String;
    })
    .catch((err) => {
      return err;
    })

  return imageBase64;
}
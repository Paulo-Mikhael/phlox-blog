import { useRecoilValue } from "recoil";
import { actualUserState } from "../../state/atom";
import { Modal } from "../Modal";
import { useEffect, useRef, useState } from "react";
import { useSetActualUser } from "../../state/hooks/useSetActualUser";
import { insertToDatabase } from "../../utils/firebase/functions/insertToDatabase";
import { IUser } from "../../interfaces/IUser";
import { submitImageToStorage } from "../../utils/firebase/functions/submitImageToStorage";
import { setActualUser } from "../../utils/setActualUser";
import { useSetPosts } from "../../state/hooks/useSetPosts";
import { useSetUsers } from "../../state/hooks/useSetUsers";
import { getUsers } from "../../utils/getUsers";
import { getPosts } from "../../utils/getPosts";
import { Loader } from "lucide-react";

export function PersonalizePerfilModal() {
  const actualUser = useRecoilValue(actualUserState);
  const setActualUserState = useSetActualUser();
  const setUsers = useSetUsers();
  const setPosts = useSetPosts();
  const [imageLoding, setImageLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function updateActualUserAvatar() {
    if (!actualUser || !image) return;
    setImageLoading(true);

    const path = `users/${actualUser.data.id}`;

    submitImageToStorage(image)
      .then((url) => {
        const updatedData: IUser = {
          ...actualUser.data,
          avatarUrl: url
        }

        insertToDatabase(path, updatedData)
          .then(() => {
            actualUser.auth && setActualUser(setActualUserState, actualUser.auth)
              .then(() => {
                getUsers(setUsers);
                getPosts(setPosts)
                  .then(() => {
                    setImageLoading(false);
                  });
              });
          });
      });
  }

  if (!actualUser) return;

  useEffect(() => {
    updateActualUserAvatar();
  }, [image]);

  return (
    <>
      <input accept="image/*" ref={inputRef} hidden type="file" onChange={(evt) => {
        const file = evt.target.files?.[0];
        if (!file) return;
        setImage(file);
      }} />
      <Modal modalKey="PPM">
        <figure className="w-full flex flex-col justify-center items-center gap-3">
          <span className="h-32 w-32 flex justify-center bg-typo-600 rounded-full">
            {!imageLoding && (
              <img
                src={actualUser.data.avatarUrl ? actualUser.data.avatarUrl : "images/user.png"}
                alt={`avatar do usuário de email: ${actualUser.data.email}`}
                className="h-full w-full rounded-full cursor-pointer hover:grayscale"
                onClick={() => {
                  imageLoding === false && inputRef.current?.click();
                }}
              />
            )}
            {imageLoding && <Loader className="size-10 m-auto animate-spin text-main-red-300" />}
          </span>
          <figcaption className="text-typo-700 text-section-subtitle font-bold flex gap-2 items-center">
            {actualUser.data.email}
          </figcaption>
        </figure>
      </Modal>
    </>
  );
}
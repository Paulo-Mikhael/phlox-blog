import { useRecoilValue } from "recoil";
import { actualUserState } from "../../state/atom";
import { Modal } from "../Modal";

export function PersonalizePerfilModal() {
  const actualUser = useRecoilValue(actualUserState);

  if (!actualUser) return;

  return (
    <>
      <Modal modalKey="PPM">
        <figure className="w-full flex flex-col justify-center items-center gap-3">
          <img
            src={actualUser.data.avatarUrl ? actualUser.data.avatarUrl : "images/user.png"}
            alt={`avatar do usuário de email: ${actualUser.data.email}`}
            className="h-32 w-32 rounded-full cursor-pointer hover:grayscale"
          />
          <figcaption className="text-typo-700 text-section-subtitle font-bold flex gap-2 items-center">
            {actualUser.data.email}
          </figcaption>
        </figure>
      </Modal>
    </>
  );
}
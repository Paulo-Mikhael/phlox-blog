import { ArrowRightLeft, Pencil, Trash } from "lucide-react";
import { Modal } from "../Modal";
import { colors } from "../../styles/variables";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../../state/atom";
import NotFound from "../../pages/NotFound";
import { deleteUser, signOut, User } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase/firebase";

export function PersonalizePerfilModal(
  { openModal, setOpenModal }: { openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }
) {
  const auth = firebaseAuth;
  const navigate = useNavigate();
  const actualUser = useRecoilValue(actualUserState);

  if (!actualUser) return <NotFound />;

  function SignOut() {
    signOut(auth).then(() => {
      console.log("Sessão terminada");
      navigate("/", { replace: true });
    }).catch((error) => {
      console.log(error);
    });
  }
  function Delete(user: User) {
    deleteUser(user).then(() => {
      navigate("/", { replace: true });
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <figure className="w-full flex flex-col justify-center items-center gap-3">
        <img
          src={actualUser.data.avatarUrl ? actualUser.data.avatarUrl : "images/user.png"}
          alt={`avatar do usuário de email: ${actualUser.data.email}`}
          className="h-32 w-32 rounded-full cursor-pointer hover:grayscale"
        />
        <figcaption className="text-typo-700 text-section-subtitle font-bold flex gap-2 items-center">
          {actualUser.data.email}
          <Pencil color={colors.typo[700]} size={18} className="cursor-pointer" />
        </figcaption>
      </figure>
      <div className="mt-4 flex flex-col gap-2">
        <Button.Root onClick={() => navigate("/login")} variant="outlined">
          <Button.Text content="Trocar de Conta" />
          <Button.Icon icon={ArrowRightLeft} />
        </Button.Root>
        <Button.Root
          onClick={() => {
            console.log(actualUser.auth?.email);
            actualUser.auth && Delete(actualUser.auth);
          }}
        >
          <Button.Text content="Excluir Minha Conta" />
          <Button.Icon icon={Trash} />
        </Button.Root>
      </div>
    </Modal>
  );
}
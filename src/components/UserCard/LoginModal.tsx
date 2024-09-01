import { Modal } from "../Modal";
import { Button } from "../Button";
import { Form } from "../Form";
import { Link } from "react-router-dom";

interface LoginModalProps {
  openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoginModal({ openModal, setOpenModal }: LoginModalProps) {
  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Form.Root className="gap-4">
        <Form.Label className="max-w-64 text-center" text="Para favoritar usuários você precisa estar logado na plataforma" />
        <div className="flex justify-between">
          <Button.Root>
            <Link to="/login">
              <Button.Text content="Fazer login" />
            </Link>
          </Button.Root>
          <Button.Root variant="outlined">
            <Link to="/signup">
              <Button.Text content="Cadastrar-se" />
            </Link>
          </Button.Root>
        </div>
      </Form.Root>
    </Modal>
  );
}
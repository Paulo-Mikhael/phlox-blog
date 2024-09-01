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
          <Link to="/login">
            <Button.Root>
              <Button.Text content="Fazer login" />
            </Button.Root>
          </Link>
          <Link to="/signup">
            <Button.Root variant="outlined">
              <Button.Text content="Cadastrar-se" />
            </Button.Root>
          </Link>
        </div>
      </Form.Root>
    </Modal>
  );
}
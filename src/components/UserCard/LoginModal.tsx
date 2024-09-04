import { Modal } from "../Modal";
import { Button } from "../Button";
import { Form } from "../Form";
import { Link } from "react-router-dom";
import { useSetModalValue } from "../../state/hooks/useSetModalValue";

export function LoginModal() {
  const setOpenModalLM = useSetModalValue("LM");

  return (
    <Modal modalKey="LM">
      <Form.Root className="gap-4">
        <Form.Label className="max-w-64 text-center" text="Para favoritar usuários você precisa estar logado na plataforma" />
        <div className="flex justify-between">
          <Link to="/login">
            <Button.Root 
              onClick={() => setOpenModalLM(false)}
            >
              <Button.Text content="Fazer login" />
            </Button.Root>
          </Link>
          <Link to="/signup">
            <Button.Root 
              variant="outlined"
              onClick={() => setOpenModalLM(false)} 
            >
              <Button.Text content="Cadastrar-se" />
            </Button.Root>
          </Link>
        </div>
      </Form.Root>
    </Modal>
  );
}
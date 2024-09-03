import { useSetModalValue } from "../../state/hooks/useSetModalValue";
import { Button } from "../Button";
import { Form } from "../Form";
import { Modal } from "../Modal";

interface ChangeEmailModalProps {
  onContinue?: () => void,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

export function ChangeEmailModal({ onContinue, password, setPassword }: ChangeEmailModalProps) {
  const setOpenModalCEM = useSetModalValue("CEM");
  const setOpenModalPPM = useSetModalValue("PPM");

  return (
    <Modal modalKey="CEM">
      <Form.Root className="gap-2" twWidth="w-96">
        <Form.Label text="Insira sua senha para continuar:" />
        <Form.Input 
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <div className="flex gap-2">
          <Button.Root
            twWidth="w-full"
            onClick={() => {
              setOpenModalCEM(false);
              setOpenModalPPM(true);
              onContinue && onContinue();
            }}
          >
            <Button.Text content="Continuar" />
          </Button.Root>
          <Button.Root
            twWidth="w-full"
            variant="outlined"
            onClick={() => {
              setOpenModalCEM(false);
              setOpenModalPPM(true);
            }}
          >
            <Button.Text content="Cancelar" />
          </Button.Root>
        </div>
      </Form.Root>
    </Modal>
  );
}
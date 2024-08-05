import { LogIn, LogOut, WrapTextIcon } from "lucide-react"
import { Button } from "./components/Button"
import { TextForm } from "./components/TextForm"

function App() {
  return (
    <div className="px-4">
      <h1 className="text-highlight font-bold text-typo-700">
        TEXTO-DESTAQUE
      </h1>
      <Button.Root variant="outlined">
        <Button.Text content="Entrar" />
        <Button.Icon icon={LogOut} />
      </Button.Root>
      <TextForm.Root>
        <TextForm.Label labelText="Campo de texto" htmlFor="form-html" />
        <TextForm.Input placeholder="Digite algo nesse campo de texto" id="form-html" iconLeft={WrapTextIcon} iconRight={LogIn} />
        <TextForm.Hint hintText="Dica de como usar o input acima" />
      </TextForm.Root>
    </div>
  )
}

export default App

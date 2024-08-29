import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ArrowBigLeft, House } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-3 items-center justify-center min-h-[100vh]">
      <img className="w-[500px]" src="images/404-image.png" alt="" />
      <div className="flex gap-2">
        <Button.Root
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          <Button.Icon icon={ArrowBigLeft} />
          <Button.Text content="VOLTAR À PÁGINA ANTERIOR" />
        </Button.Root>
        <Button.Root
          onClick={() => navigate("/")}
        >
          <Button.Text content="IR À HOME" />
          <Button.Icon icon={House} />
        </Button.Root>
      </div>
    </main>
  );
}
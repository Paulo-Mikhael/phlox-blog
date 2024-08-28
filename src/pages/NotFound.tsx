import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ArrowBigLeft } from "lucide-react";

export default function NotFound(){
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-3 items-center justify-center min-h-[100vh]">
      <img className="w-[500px]" src="images/404-image.png" alt="" />
      <Button.Root
        onClick={() => navigate(-1)}
      >
        <Button.Icon icon={ArrowBigLeft} />
        <Button.Text content="VOLTAR" />
      </Button.Root>
    </main>
  );
}
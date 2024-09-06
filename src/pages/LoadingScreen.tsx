import { LoaderCircle } from "lucide-react";
import { colors } from "../styles/variables";

export default function LoadingScreen() {
  return (
    <main className="bg-typo-150 min-w-full min-h-[100vh] flex items-center">
      <LoaderCircle className="animate-spin mx-auto" size={80} color={colors.redMain[300]} />
    </main>
  );
}
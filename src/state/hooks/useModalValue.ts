import { useRecoilValue } from "recoil";
import { modalsState } from "../atom";
import { normalizeText } from "../../utils/normalizeText";

export function useModalValue(key: string): boolean{
  const modals = useRecoilValue(modalsState);
  const requiredModal = modals.find((item) => item.key === normalizeText(key));

  if (!requiredModal) return false;

  return requiredModal.opened;
};
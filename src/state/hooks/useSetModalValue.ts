import { useSetRecoilState } from "recoil";
import { modalsState } from "../atom";
import { normalizeText } from "../../utils/normalizeText";

export function useSetModalValue(key: string) {
  const normalizedKey = normalizeText(key);
  const setModals = useSetRecoilState(modalsState);

  return (booleanValue: boolean) => {
    setModals((prev) => 
      prev.map(item => ({
        ...item,
        opened: item.key === normalizedKey ? booleanValue : item.opened
      }))
    );
  }
}
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalsState } from "../atom";
import { normalizeText } from "../../utils/normalizeText";

export function useCreateModal() {
  const modals = useRecoilValue(modalsState);
  const setModals = useSetRecoilState(modalsState);

  return (key: string) => {
    const normalizedKey = normalizeText(key);
    const modalToFind = modals.find((item) => item.key === normalizedKey);

    if (!modalToFind) {
      setModals((prv) => [...prv, { key: normalizedKey, opened: false }]);
    };
  }
}
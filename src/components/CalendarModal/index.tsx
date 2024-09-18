import { Calendar } from "@nextui-org/react";
import { Modal } from "../Modal";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Button } from "../Button";
import { Filter, FilterX } from "lucide-react";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { postsFilterState } from "../../state/atom";
import { useSetPostFilterDate } from "../../state/hooks/useSetFilterPostDate";

export function CalendarModal() {
  const filterDate = useRecoilValue(postsFilterState);
  const setFilterDate = useSetPostFilterDate();
  const date = dayjs(filterDate.postDate);
  const formatedDate = `${date.format("DD")}/${date.format("MM")}/${date.format("YYYY")}`;

  return (
    <Modal modalKey="OCM">
      <Calendar
        onChange={(evt) => {
          setFilterDate(evt.toString());
        }}
        value={filterDate.postDate ? parseDate(filterDate.postDate) : today(getLocalTimeZone())}
        defaultValue={filterDate.postDate ? parseDate(filterDate.postDate) : today(getLocalTimeZone())}
      />
      {filterDate.postDate && (
        <h2 className="w-full text-center mt-3">
          A partir de {formatedDate}
        </h2>
      )}
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <Button.Root twWidth="w-full">
            <Button.Text content="Filtrar" />
            <Button.Icon icon={Filter} />
          </Button.Root>
        </div>
        <div className="flex-1">
          <Button.Root
            twWidth="w-full"
            variant="outlined"
            onClick={() => {
              setFilterDate(null);
            }}
          >
            <Button.Text content="Limpar" />
            <Button.Icon icon={FilterX} />
          </Button.Root>
        </div>
      </div>
    </Modal>
  );
}
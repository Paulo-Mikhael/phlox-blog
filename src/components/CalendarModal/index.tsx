import { Calendar } from "@nextui-org/react";
import { Modal } from "../Modal";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Button } from "../Button";
import { Filter, FilterX } from "lucide-react";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { postsFilterState } from "../../state/atom";
import { useSetPostFilterDate } from "../../state/hooks/useSetFilterPostDate";
import { useEffect, useState } from "react";
import { useSetModalValue } from "../../state/hooks/useSetModalValue";

export function CalendarModal() {
  const filterDate = useRecoilValue(postsFilterState);
  const setFilterDate = useSetPostFilterDate();
  const setCalendarModalValue = useSetModalValue("OCM");
  const [currentDate, setCurrentDate] = useState<string>("");
  const date = dayjs(currentDate);
  const formatedDate = `${date.format("DD")}/${date.format("MM")}/${date.format("YYYY")}`;
  const [invalidDate, setInvalidDate] = useState<boolean>(false);

  useEffect(() => {
    currentDate !== "" && setInvalidDate(false);
  }, [currentDate]);
  useEffect(() => {
    filterDate.postDate && setCurrentDate(filterDate.postDate);
  }, []);

  return (
    <Modal modalKey="OCM">
      <Calendar
        visibleMonths={2}
        onChange={(evt) => {
          setCurrentDate(evt.toString());
        }}
        value={currentDate !== "" ? parseDate(currentDate) : today(getLocalTimeZone())}
        defaultValue={currentDate !== "" ? parseDate(currentDate) : today(getLocalTimeZone())}
      />
      {currentDate !== "" && (
        <h2 className="w-full text-center mt-3">
          A partir de {formatedDate}
        </h2>
      )}
      {invalidDate && (
        <p role="alert" className="w-full text-center mt-3 text-feedback-danger">
          Selecione uma data
        </p>
      )}
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <Button.Root 
            twWidth="w-full"
            onClick={() => {
              if (currentDate === "") {
                setInvalidDate(true);
                return;
              };

              setFilterDate(currentDate);
              setCurrentDate("");
              setCalendarModalValue(false);
            }}
          >
            <Button.Text content="Filtrar" />
            <Button.Icon icon={Filter} />
          </Button.Root>
        </div>
        <div className="flex-1">
          <Button.Root
            twWidth="w-full"
            variant="outlined"
            onClick={() => {
              setFilterDate(undefined);
              setCurrentDate("");
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
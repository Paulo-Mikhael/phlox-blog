import { ElementType } from "react";
import { colors } from "../styles/variables";
import { Clock } from "lucide-react";

interface DateProps { 
  date: string, 
  icon?: boolean, 
  personalizedIcon?: ElementType, 
  onlyWeek?: boolean,
  onlyDay?: boolean
}

export function DateInfo({ date, icon, personalizedIcon: PersonalizedIcon, onlyWeek, onlyDay }: DateProps) {
  const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const dateObjc = new Date(date);

  return (
    <span className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-[10px]">
        {icon && !PersonalizedIcon && <Clock color={colors.redMain[300]} size={22} />}
        {icon && PersonalizedIcon && <PersonalizedIcon color={colors.redMain[300]} size={22} />}
        {!onlyWeek && <p className="text-typo-700">{`${dateObjc.toLocaleString().slice(0, 10)}`}</p>}
      </div>
      <p className="text-typo-700">
        {!onlyDay && daysOfWeek[dateObjc.getDay()]}
      </p>
    </span>
  );
}
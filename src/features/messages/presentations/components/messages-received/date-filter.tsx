// DateFilter.tsx
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface DateFilterProps {
  date: DateRange | undefined;
  onDateSelect: (date: DateRange) => void;
  onClear: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  date,
  onDateSelect,
  onClear,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full lg:w-[320px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLLL dd, y", { locale: ptBR })} -{" "}
                {format(date.to, "LLLL dd, y", { locale: ptBR })}
              </>
            ) : (
              format(date.from, "LLLL dd, y", { locale: ptBR })
            )
          ) : (
            <span>Selecione um intervalo de datas</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date || undefined}
          onSelect={(range) => range && onDateSelect(range)}
          numberOfMonths={2}
        />
      </PopoverContent>
      {(date?.from || date?.to) && (
        <Button
          variant="link"
          className="w-full lg:w-auto mt-4 lg:mt-0"
          onClick={onClear}
        >
          Limpar Data
        </Button>
      )}
    </Popover>
  );
};

export default DateFilter;

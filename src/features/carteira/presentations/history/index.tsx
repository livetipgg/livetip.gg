import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { withLayout } from "@/HOC/withLayout";
import { cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
import { ArrowLeftRight, CalendarIcon, Hash, Search } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import pixLogo from "@/assets/pix-logo.png";
import bitcoinLogo from "@/assets/bitcoin-logo.png";

const TransactionsHistory = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    to: new Date(),
    from: subDays(new Date(), 30),
  });
  return (
    <div>
      <SectionTitle title="Histórico de Transações" />
      {/*  */}

      <div className="flex justify-between items-center flex-wrap bg-muted/40 p-4">
        <div className="flex gap-4 flex-wrap flex-1 ">
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
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button variant="default" className="w-full lg:w-auto mt-4 lg:mt-0">
          <Search className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>
      <span className="text-muted-foreground text-sm">
        Filtrando transações de{" "}
        <span className="font-semibold">
          {format(date?.from || new Date(), "dd/MM/yyyy")}
        </span>{" "}
        até{" "}
        <span className="font-semibold">
          {format(date?.to || addDays(new Date(), 30), "dd/MM/yyyy")}
        </span>
      </span>
      {/* Transações */}
      <div className="border p-4 mt-10 bg-muted/40 flex items-center justify-between">
        <div className="flex items-center gap-10 flex-1">
          <ArrowLeftRight className="h-4 w-4" />
          {/* Data */}
          <span className="text-md"> 25 de Setembro de 2021</span>
          {/* ID da transação */}
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-md text-muted-foreground">
                ID da transação
              </span>
              <span className="text-md font-semibold">
                E004169682024092600157QrTSY2mVi4
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={bitcoinLogo} alt="pix" className="w-6 h-6 " />
          <span>
            <span className="text-lg font-bold">0.50000000 BTC</span>
          </span>
        </div>
      </div>
      <div className="border p-4 mt-10 bg-muted/40 flex items-center justify-between">
        <div className="flex items-center gap-10 flex-1">
          <ArrowLeftRight className="h-4 w-4" />
          {/* Data */}
          <span className="text-md"> 25 de Setembro de 2021</span>
          {/* ID da transação */}
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-md text-muted-foreground">
                ID da transação
              </span>
              <span className="text-md font-semibold">
                E004169682024092600157QrTSY2mVi4
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src={pixLogo} alt="pix" className="w-6 h-6 " />
          <span>
            <span className="text-lg font-bold">R$ 100,00</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const TransactionsHistoryPage = withLayout(
  TransactionsHistory,
  "LiveChat - Histórico de Transações"
);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { withLayout } from "@/HOC/withLayout";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CheckCheck,
  MessageSquareMore,
  Search,
} from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { formatTextMaxCaracters } from "@/helpers/formatTextMaxCaracters";

const MessagesReceived = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  return (
    <div>
      <h1 className="text-2xl">Mensagens Recebidas</h1>
      <div className="mt-5">
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-4  flex-wrap flex-1">
            <Input placeholder="Pesquisar" className="w-full lg:w-[320px] " />
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
      </div>
      <div className="mt-10">
        <span className="text-muted-foreground text-md font-bold">
          16 de Setembro
        </span>
        <div>
          {/* Messages */}
          <div className="flex gap-4 mt-10 flex-col border-red-500">
            <div className=" flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg border-success relative ">
              <CheckCheck className="h-5 w-5 text-success mr-5" />

              <Badge className="bg-success text-white absolute -top-4 left-4">
                Última mensagem recebida
              </Badge>
              <div className="flex flex-col min-w-fit ">
                <strong>Michael Scott</strong>
                <span>14:30</span>
              </div>
              <div className="flex  w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />

                <p
                  className="text-sm font-normal"
                  onClick={() => {
                    console.log("Open message");
                  }}
                >
                  {formatTextMaxCaracters(
                    "Gostei muito do seu trabalho, parabéns!",
                    180
                  )}
                </p>
              </div>
              <span className="text-success text-2xl  font-semibold min-w-fit  ">
                R$ 100,00
              </span>
            </div>
            <div className=" flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg  relative">
              <CheckCheck className="h-5 w-5 text-success mr-5" />

              <div className="flex flex-col min-w-fit ">
                <strong>Michael Scott</strong>
                <span>14:30</span>
              </div>
              <div className="flex  w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />

                <p
                  className="text-sm font-normal"
                  onClick={() => {
                    console.log("Open message");
                  }}
                >
                  {formatTextMaxCaracters("Foi o que ela disse", 180)}
                </p>
              </div>
              <span className="text-success text-2xl  font-semibold min-w-fit  ">
                R$ 100,00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagesReceivedPage = withLayout(MessagesReceived);

export default MessagesReceivedPage;

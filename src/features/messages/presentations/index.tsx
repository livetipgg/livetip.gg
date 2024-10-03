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
import { Title } from "@/components/title";
import { ptBR } from "date-fns/locale";
import { ButtonNewLive } from "@/components/button-new-live";
import { SectionTitle } from "@/components/section-title";

// Função para gerar dados aleatórios
const generateRandomMessages = () => {
  const names = [
    "Michael Scott",
    "Pam Beesly",
    "Jim Halpert",
    "Dwight Schrute",
    "Stanley Hudson",
    "Ryan Howard",
    "Kelly Kapoor",
    "Angela Martin",
    "Oscar Martinez",
    "Phyllis Vance",
  ];

  const messages = [
    "Gostei muito do seu trabalho, parabéns!",
    "Foi o que ela disse.",
    "Incrível!",
    "Vamos marcar um horário para discutir.",
    "Seu projeto está excelente.",
    "Precisamos rever os prazos.",
    "Estou ansioso para começar!",
    "Esse relatório precisa de ajustes.",
    "Por favor, envie os documentos até amanhã.",
    "Nosso próximo encontro será na terça-feira.",
    "Obrigado pela entrega rápida!",
    "Os resultados foram impressionantes.",
    "Podemos agendar uma reunião?",
    "Você está fazendo um ótimo trabalho.",
    "Vamos precisar de mais tempo.",
    "Esse design está ótimo!",
    "Aguardando sua confirmação.",
    "Os dados estão incompletos.",
    "Me avise se precisar de algo.",
    "Podemos discutir os detalhes amanhã?",
  ];

  const dates = [
    new Date(),
    addDays(new Date(), -1),
    addDays(new Date(), -3),
    addDays(new Date(), -5),
    addDays(new Date(), -10),
    addDays(new Date(), -15),
    addDays(new Date(), -20),
    addDays(new Date(), -25),
  ];

  return dates.flatMap((date, dateIndex) =>
    Array.from({ length: 3 }, (_, messageIndex) => ({
      name: names[Math.floor(Math.random() * names.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      time: format(addDays(date, messageIndex), "HH:mm"),
      amount: `R$ ${(Math.random() * 500).toFixed(2)}`,
      date: format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      isLast: dateIndex === 0 && messageIndex === 0,
    }))
  );
};

const MessagesReceived = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  const messagesByDate = generateRandomMessages();

  return (
    <div>
      <SectionTitle title="Mensagens Recebidas" actions={<ButtonNewLive />} />

      <div>
        <div className="flex justify-between items-center flex-wrap bg-muted/40 p-4">
          <div className="flex gap-4 flex-wrap flex-1 ">
            <Input
              placeholder="Pesquisar"
              className="w-full lg:w-[320px] bg-white dark:bg-black"
            />
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
        {messagesByDate.map((message, index) => (
          <div key={index}>
            {index === 0 || message.date !== messagesByDate[index - 1].date ? (
              <div className="my-6">
                <span className="text-muted-foreground text-md font-bold mt-3">
                  {message.date}
                </span>
              </div>
            ) : null}
            <div
              className={cn(
                "flex flex-col md:flex-row w-full items-start md:items-center justify-between border-2 p-4 rounded-lg mt-4 relative",
                message.isLast ? "border-success" : ""
              )}
            >
              <CheckCheck className="h-5 w-5 text-success mr-5" />
              {message.isLast && (
                <Badge className="bg-success text-white absolute -top-4 left-4">
                  Última mensagem recebida
                </Badge>
              )}
              <div className="flex flex-col w-[200px]">
                <strong>{message.name}</strong>
                <span>{message.time}</span>
              </div>
              <div className="flex w-full my-10 md:mx-10 md:my-0">
                <MessageSquareMore className="h-5 w-5 mr-2" />
                <p className="text-sm font-normal">
                  {formatTextMaxCaracters(message.message, 180)}
                </p>
              </div>
              <span className="text-success text-2xl font-semibold min-w-fit">
                {message.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesReceivedPage = withLayout(
  MessagesReceived,
  "LiveChat - Mensagens Recebidas"
);

export default MessagesReceivedPage;

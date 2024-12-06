import { NoContent } from "@/components/no-content";
import { messageState } from "@/features/messages/states/atoms";
import { useRecoilValue } from "recoil";
import { TransmissionMessage } from "./transmission_message";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const TransmissionMessages = () => {
  const { transmissionMessages } = useRecoilValue(messageState);

  if (!transmissionMessages.results.length) {
    return <NoContent message="Nenhuma mensagem para mostrar" />;
  }

  const messages = transmissionMessages.results;
  const unreadMessages = messages.filter((message) => !message.read);
  const readMessages = messages.filter((message) => message.read);

  return (
    <>
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="todas" className="w-full gap-2">
            Todas
            <Badge variant="destructive">
              {transmissionMessages.results.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="nao_lidas" className="w-full gap-2">
            Não Lidas
            <Badge variant="destructive">{unreadMessages.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="lidas" className="w-full gap-2">
            Lidas
            <Badge variant="destructive">{readMessages.length}</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="todas" className="pb-10">
          {!!transmissionMessages.results.length &&
            [...transmissionMessages.results]
              .sort((a, b) => Number(a.read) - Number(b.read))
              .map((message) => (
                <TransmissionMessage message={message} key={message._id} />
              ))}
          {!transmissionMessages.results.length && (
            <NoContent message="Nenhuma mensagem para mostrar" />
          )}
        </TabsContent>
        <TabsContent value="nao_lidas" className="pb-10">
          {!!unreadMessages.length &&
            unreadMessages.map((message) => (
              <TransmissionMessage message={message} key={message._id} />
            ))}
          {!unreadMessages.length && (
            <NoContent message="Nenhuma mensagem não lida" />
          )}
        </TabsContent>
        <TabsContent value="lidas" className="pb-10">
          {!!readMessages.length &&
            readMessages.map((message) => (
              <TransmissionMessage message={message} key={message._id} />
            ))}
          {!readMessages.length && (
            <NoContent message="Nenhuma mensagem lida" />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

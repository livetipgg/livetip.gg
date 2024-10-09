import { Info } from "lucide-react";

interface NoContentProps {
  message?: string;
}

export const NoContent = ({ message }: NoContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center  border border-input rounded p-2 bg-muted/40 ">
      <div className=" text-gray-500 flex items-center gap-2">
        <Info className="h-6 w-6 text-gray-500" />
        <span className="text-sm font-medium p-0 m-0">
          {message || " Nenhum conteúdo disponível"}
        </span>
      </div>
    </div>
  );
};

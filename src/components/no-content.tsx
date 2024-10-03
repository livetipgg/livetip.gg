interface NoContentProps {
  message?: string;
}

export const NoContent = ({ message }: NoContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded p-2 ">
      <div className="text-sm font-medium text-gray-500">
        {message || " Nenhum conteúdo disponível"}
      </div>
    </div>
  );
};

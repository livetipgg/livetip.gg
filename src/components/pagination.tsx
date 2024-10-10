import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  total,
  onPageChange,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); // Chama a função com a próxima página
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">
        Página {currentPage} de {totalPages} ({total} registros)
      </p>
      <div className="flex gap-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
          variant={"outline"}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        <Button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          variant={"outline"}
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationComponent;

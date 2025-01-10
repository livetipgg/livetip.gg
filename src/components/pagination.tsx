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
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Calculate range of pages to display
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    // Add the first page and ellipsis if needed
    if (startPage > 2) {
      pages.push(1);
      if (startPage > 3) {
        pages.push("...");
      }
    }

    // Add the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and the last page if needed
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (typeof page === "string") {
        return (
          <span key={index} className="text-gray-500 mx-1">
            {page}
          </span>
        );
      }
      return (
        <Button
          key={index}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? "default" : "outline"}
          className={page === currentPage ? "bg-blue-500 text-white" : ""}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">
        Página {currentPage} de {totalPages} ({total} registros)
      </p>
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
          variant={"outline"}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        <div className="flex items-center gap-1">{renderPageNumbers()}</div>

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

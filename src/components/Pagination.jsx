import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
          <Button
          key={i}
            variant={i === currentPage ? "blue" : "outline"}
            size="sm"
            className="mx-1"
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-8 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Prev
      </Button>

      <div className="flex items-center">{renderPageNumbers()}</div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default Pagination;
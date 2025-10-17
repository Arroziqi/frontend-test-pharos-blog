"use client";

import React from "react";
import { Button, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </IconButton>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "contained" : "text"}
            size="small"
            onClick={() => onPageChange(page as number)}
            className={
              page === currentPage
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300"
            }
          >
            {page}
          </Button>
        ),
      )}

      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default Pagination;

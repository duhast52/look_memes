import { useState } from "react";

interface PaginationReturnTypes {
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  currentData: () => any[];
  currentPage: number;
  maxPage: number;
}

function usePagination(data: any, itemsPerPage: number): PaginationReturnTypes {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data?.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data?.slice(begin, end);
  }

  function next() {
    setCurrentPage((page) => Math.min(page + 1, maxPage));
  }

  function prev() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;

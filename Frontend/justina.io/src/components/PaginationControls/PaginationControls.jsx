import { ArrowLeftIcon, ArrowRightIcon } from "../icons";
//import Show from "../Show/Show";

export default function PaginationControls({ table, pagination }) {
  const { pageIndex } = pagination;
  const pageCount = table.getPageCount();
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(pageIndex - 2, 0);
  let endPage = Math.min(startPage + maxVisiblePages, pageCount);

  // Adjust start and end pages if we're at the beginning or end of the page range
  if (endPage - startPage < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages, 0);
  }

  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-x-12 mt-6">
      <button
        className="shadow-glass-effect bg-rose-o10 rounded-full p-2"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ArrowLeftIcon />
      </button>
      <div className="flex justify-center items-center gap-x-4 ">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            className={`rounded-full p-2 w-11 text-neutrals800 font-bold transition-all duration-300 ${
              pageIndex === pageNum
                ? "bg-[#FCE7EF] opacity-100"
                : "bg-rose-o10 shadow-glass-effect opacity-90"
            }`}
            onClick={() => table.setPageIndex(pageNum)}
            disabled={pageIndex === pageNum}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>
      <button
        className="shadow-glass-effect bg-rose-o10 rounded-full p-2"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}

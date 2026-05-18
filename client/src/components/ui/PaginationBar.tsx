import type { FC } from "react";
import type { PaginationBarProps } from "@/types/pagination";
import Icon from "@/components/ui/Icon";

const PaginationBar: FC<PaginationBarProps> = ({ page, pages, total, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-gray-800">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Page {page} of {pages} · {total} leads
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300"
        >
          <Icon name="chevL" className="w-4 h-4" />
        </button>

        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition ${
              page === i + 1
                ? "bg-violet-500 text-white shadow-md shadow-violet-500/30"
                : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page === pages}
          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300"
        >
          <Icon name="chevR" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;

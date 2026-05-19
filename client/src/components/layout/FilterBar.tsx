import type { FC } from "react";
import type { FilterBarProps } from "@/types/layout";
import type { LeadSource, LeadStatus } from "@/types/lead";
import type { SortOrder } from "@/types/api";
import { STATUSES, SOURCES } from "@/libs/constants";
import { Search } from "lucide-react";
import { capitalizeWords } from "@/libs/utils";

const FilterBar: FC<FilterBarProps> = ({
	search, status, source, sort,
	onSearchChange, onStatusChange, onSourceChange, onSortChange, onClear,
}) => {
	const hasFilters = !!(search || status || source);

	return (
		<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-4 flex flex-wrap gap-3 items-center">
			{/* Search */}
			<div className="relative flex-1 min-w-[200px]">
				<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
				<input
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search by name or email…"
					className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
				/>
			</div>

			{/* Status */}
			<select
				value={status}
				onChange={(e) => onStatusChange(e.target.value as LeadStatus | "")}
				className="px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
			>
				<option value="">All Statuses</option>
				{STATUSES.map((s) => <option key={s} value={s}>{capitalizeWords(s)}</option>)}
			</select>

			{/* Source */}
			<select
				value={source}
				onChange={(e) => onSourceChange(e.target.value as LeadSource | "")}
				className="px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
			>
				<option value="">All Sources</option>
				{SOURCES.map((s) => <option key={s} value={s}>{capitalizeWords(s)}</option>)}
			</select>

			{/* Sort */}
			<select
				value={sort}
				onChange={(e) => onSortChange(e.target.value as SortOrder)}
				className="px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition"
			>
				<option value="latest">Newest First</option>
				<option value="oldest">Oldest First</option>
			</select>

			{/* Clear */}
			<button
				onClick={onClear}
				disabled={!hasFilters}
				className={`
					px-3 py-2.5 text-xs border rounded-xl transition
					${ hasFilters
						? "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
						: "text-gray-300 dark:text-gray-600 border-gray-200 dark:border-gray-800 cursor-not-allowed opacity-60"
					}
				`}
			>

				Clear filters
			</button>
		</div>
	);
};

export default FilterBar;

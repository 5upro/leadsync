import type { FC } from "react";
import type { LeadRowProps } from "@/types/leadComponents";
import { SOURCE_ICON } from "@/libs/constants";
import { capitalizeWords, fmtDate } from "@/libs/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import { ContactRound, SquarePen, Trash2 } from "lucide-react";

const LeadRow: FC<LeadRowProps> = ({ lead, isAdmin, onView, onEdit, onDelete }) => (
	<tr className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
		{/* Name */}
		<td className="px-4 py-3.5">
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
					{capitalizeWords(lead.name[0])}
				</div>
				<span className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</span>
			</div>
		</td>

		{/* Email */}
		<td className="px-4 py-3.5 text-sm text-gray-500 dark:text-gray-400">{lead.email}</td>

		{/* Status */}
		<td className="px-4 py-3.5">
			<StatusBadge status={lead.status}/>
		</td>

		{/* Source */}
		<td className="px-4 py-3.5 text-sm text-gray-500 dark:text-gray-400">
			{(() => {
				const Icon = SOURCE_ICON[lead.source]
				return (
					<>
						<Icon className="inline mr-1 h-4 w-4" />
						{capitalizeWords(lead.source)}
					</>
				)
			})()}
		</td>

		{/* Date */}
		<td className="px-4 py-3.5 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
			{fmtDate(lead.createdAt)}
		</td>

		{/* Actions */}
		<td className="px-4 py-3.5">
			<div className="flex items-center gap-1 justify-end">
				<button
					onClick={() => onView(lead)}
					className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition"
				>
					<ContactRound size={20} className="w-4 h-4" />

				</button>
				<button
					onClick={() => onEdit(lead)}
					className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition"
				>
					<SquarePen size={20} className="w-4 h-4"/>
				</button>
				{isAdmin && (
					<button
						onClick={() => onDelete(lead)}
						className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition"
					>
						<Trash2 size={20} className="w-4 h-4" />
					</button>
				)}
			</div>
		</td>
	</tr>
);

export default LeadRow;

import type { FC } from "react";
import type { LeadDrawerProps } from "@/types/leadComponents";
import { SOURCE_ICON } from "@/libs/constants";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { SquarePen, Trash2, X } from "lucide-react";
import { capitalizeWords, fmtDate } from "@/libs/utils";

const LeadDrawer: FC<LeadDrawerProps> = ({ lead, isAdmin, onClose, onEdit, onDelete }) => (
	<div
		className="fixed inset-0 z-40 flex justify-end animate-fadeIn"
		onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
	>
		<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

		<div className="relative bg-white dark:bg-gray-900 w-full max-w-md h-full overflow-y-auto shadow-2xl border-l border-gray-200 dark:border-gray-800">
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
				<h2 className="font-semibold text-gray-900 dark:text-white">Lead Details</h2>
				<button
					onClick={onClose}
					className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
				>
					<X size={24} />

				</button>
			</div>

			{/* Content */}
			<div className="p-6">
				{/* Avatar + name */}
				<div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
					<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-violet-500/20">
						{capitalizeWords(lead.name)[0]}
					</div>
					<div>
						<p className="font-semibold text-gray-900 dark:text-white text-lg">{lead.name}</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
					</div>
				</div>

				{/* Detail rows */}
				<div className="space-y-4">
					{([
						["Status",  <StatusBadge key="status" status={lead.status} />],
						["Source",  
							(() => {
								const Icon = SOURCE_ICON[lead.source]
								return (
									<>
										<Icon className="inline mr-1 h-4 w-4" />
										{capitalizeWords(lead.source)} 
									</>
								)
							})()
						],
						["Created", fmtDate(lead.createdAt)],
					] as [string, React.ReactNode][]).map(([label, value]) => (
							<div key={label} className="flex items-start justify-between gap-4">
								<span className="text-sm text-gray-500 dark:text-gray-400 min-w-[80px]">{label}</span>
								<span className="text-sm text-gray-900 dark:text-white text-right">{value}</span>
							</div>
						))}
				</div>

				<div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
					<Button 
						variant="secondary" 
						className="flex-1" 
						icon={<SquarePen size={16} className="w-4 h-4" />} 
						onClick={onEdit}
					>
						Edit
					</Button>
					{/* Admin actions */}
					{isAdmin && (
						<Button 
							variant="danger" 
							className="flex-1" 
							icon={<Trash2 size={16} className="w-4 h-4" />} 
							onClick={onDelete}
						>
							Delete
						</Button>
					)}
				</div>
			</div>
		</div>
	</div>
);

export default LeadDrawer;

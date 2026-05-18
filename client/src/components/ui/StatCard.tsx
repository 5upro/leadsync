import type { FC } from "react";
import type { StatCardProps } from "@/types/stat";

const StatCard: FC<StatCardProps> = ({ label, value, icon, gradient }) => (
	<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md dark:hover:shadow-gray-900 transition-shadow">
		<div className="flex items-center justify-between mb-3">
			<span className="text-2xl">{icon}</span>
			<div className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
		</div>
		<p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
		<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
	</div>
);

export default StatCard;

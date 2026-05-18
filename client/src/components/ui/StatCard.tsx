import type { FC } from "react";
import type { StatCardProps } from "@/types/stat";

const StatCard: FC<StatCardProps> = ({ label, value, icon: Icon, className }) => (
	<div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 pl-7 pr-7 hover:shadow-md dark:hover:shadow-gray-900 transition-shadow">
		<Icon size={56} className={className} />
		<div className="flex flex-col items-center justify-between ">
			<p className="text-4xl font-extrabold text-gray-900 dark:text-white">{value}</p>
			<p className="text-xl font-bold text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
		</div>
	</div>
);

export default StatCard;

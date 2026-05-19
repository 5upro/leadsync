import type { FC } from "react";
import type { StatusBadgeProps } from "@/types/stat";
import { STATUS_COLOR } from "@/libs/constants";
import { capitalizeWords } from "@/libs/utils";

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
	<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[status]}`}>
		{capitalizeWords(status)} 
	</span>
);

export default StatusBadge;

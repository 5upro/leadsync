import type { FC } from "react";
import type { StatusBadgeProps } from "@/types/stat";
import { STATUS_COLOR } from "@/libs/constants";

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
	<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[status]}`}>
		{status}
	</span>
);

export default StatusBadge;

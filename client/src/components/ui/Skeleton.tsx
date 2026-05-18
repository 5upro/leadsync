import type { FC } from "react";
import type { SkeletonProps } from "@/types/skeleton";

export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => (
	<div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

export const SkeletonRow: FC = () => (
	<tr className="border-b border-gray-100 dark:border-gray-800">
		{[0, 1, 2, 3, 4, 5].map((i) => (
			<td key={i} className="px-4 py-3">
				<Skeleton className="h-4 w-full" />
			</td>
		))}
	</tr>
);

import type { LeadSource, LeadStatus } from "@/types/lead";

export type SortOrder = "latest" | "oldest";

export interface LeadQuery {
	page: number;
	limit: number;
	status: LeadStatus | "";
	source: LeadSource | "";
	search: string;
	sort: SortOrder;
}

export interface PaginatedResponse<T> {
	message: string;
	statusCode: number;
	data: T[];
	pagination: {
		total: number,
		page: number,
		limit: number,
		totalPages: number,
		hasNextPage: boolean,
		hasPrevPage: boolean
	};
}

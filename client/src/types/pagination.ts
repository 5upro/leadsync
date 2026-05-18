export interface PaginationBarProps {
	page: number;
	pages: number;
	total: number;
	onPageChange: (page: number) => void;
}

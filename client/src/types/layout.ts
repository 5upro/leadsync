import type { User } from "@/types/auth";

export interface NavbarProps {
	user: User;
	dark: boolean;
	onToggleDark: () => void;
	onLogout: () => void;
}

export interface FilterBarProps {
	search: string;
	status: string;
	source: string;
	sort: string;
	onSearchChange: (v: string) => void;
	onStatusChange: (v: string) => void;
	onSourceChange: (v: string) => void;
	onSortChange: (v: string) => void;
	onClear: () => void;
}

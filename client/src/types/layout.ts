import type { User } from "@/types/auth";
import type { LeadSource, LeadStatus } from "@/types/lead";
import type { SortOrder } from "@/types/api";

export interface NavbarProps {
    user: User;
    dark: boolean;
    onToggleDark: () => void;
    onLogout: () => Promise<void>;
}

export interface FilterBarProps {
    search: string;
    status: LeadStatus | "";
    source: LeadSource | "";
    sort: SortOrder;
    onSearchChange: (v: string) => void;
    onStatusChange: (v: LeadStatus | "") => void;
    onSourceChange: (v: LeadSource | "") => void;
    onSortChange: (v: SortOrder) => void;
    onClear: () => void;
}

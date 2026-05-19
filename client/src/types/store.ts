import type { 
	AuthPayload, 
	LoginCredentials, 
	RegisterCredentials 
} from "@/types/auth";
import type {
    Lead,
    LeadFormData,
    LeadSource,
    LeadStatus,
} from "@/types/lead";
import type { SortOrder } from "@/types/api";
import type { ToastState } from "@/types/toast";

/* Auth Store
 */ 
export interface AuthState {
	auth: AuthPayload | null;
	authError: string;
	authLoading: boolean;
	// actions
	login: (creds: LoginCredentials) => Promise<boolean>;
	register: (creds: RegisterCredentials) => Promise<boolean>;
	logout: () => Promise<void>;
	clearAuthError: () => void;
}

export interface ThemeState {
	dark: boolean;
	toggleDark: () => void;
}

export interface LeadsState {
    // data
    leads: Lead[];
    loading: boolean;
    error: string;
    toast: ToastState | null;
    // pagination — mirrors PaginatedResponse.pagination
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    // filters
    search: string;
    debouncedSearch: string;
    status: LeadStatus | "";
    source: LeadSource | "";
    sort: SortOrder;
    // UI overlay state
    modalLead: Lead | null;
    modalOpen: boolean;
    drawerLead: Lead | null;
    deletingLead: Lead | null;
    deleteLoading: boolean;
    // actions — data
    fetchLeads: () => Promise<void>;
    createLead: (data: LeadFormData) => Promise<boolean>;
    updateLead: (id: string, data: Partial<LeadFormData>) => Promise<boolean>;
    deleteLead: (id: string) => Promise<boolean>;
    exportCSV: () => Promise<void>;
    // actions — filters
    setSearch: (s: string) => void;
    setStatus: (s: LeadStatus | "") => void;
    setSource: (s: LeadSource | "") => void;
    setSort: (s: SortOrder) => void;
    setPage: (p: number) => void;
    clearFilters: () => void;
    // actions — UI
    openCreateModal: () => void;
    openEditModal: (lead: Lead) => void;
    closeModal: () => void;
    openDrawer: (lead: Lead) => void;
    closeDrawer: () => void;
    openDeleteConfirm: (lead: Lead) => void;
    closeDeleteConfirm: () => void;
    clearError: () => void;
    clearToast: () => void;
}

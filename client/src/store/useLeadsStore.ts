import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { LeadsState } from "@/types/store";
import type { 
	LeadFormData, 
	LeadSource, 
	LeadStatus 
} from "@/types/lead";
import type { SortOrder } from "@/types/api";
import { 
	getLeads, 
	createLead, 
	updateLead, 
	deleteLead, 
	exportLeadsCSV 
} from "@/libs/api";

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

type LeadsStoreInternal = LeadsState & {
    showToastInternal: (msg: string, type: "success" | "error") => void;
};

export const useLeadsStore = create<LeadsState>()(
    devtools(
        (set, get) => ({
            /* ── Initial state ── */
            leads: [],
            loading: false,
            error: "",
            toast: null,

            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,

            search: "",
            debouncedSearch: "",
            status: "",
            source: "",
            sort: "latest",

            modalLead: null,
            modalOpen: false,
            drawerLead: null,
            deletingLead: null,
            deleteLoading: false,

            /* ── Fetching ── */
            fetchLeads: async () => {
                const { page, limit, debouncedSearch: search, status, source, sort } = get();
                set({ loading: true }, false, "leads/fetchStart");
                try {
                    const res = await getLeads({ page, limit, search, status, source, sort });
                    set({
                        leads: res.data,
                        total: res.pagination.total,
                        totalPages: res.pagination.totalPages,
                        hasNextPage: res.pagination.hasNextPage,
                        hasPrevPage: res.pagination.hasPrevPage,
                        loading: false,
                    }, false, "leads/fetchSuccess");
                } catch (e) {
                    set({
                        loading: false,
                        error: e instanceof Error ? e.message : "Failed to fetch leads",
                    }, false, "leads/fetchError");
                }
            },

            /* ── Mutations ── */
            createLead: async (data: LeadFormData): Promise<boolean> => {
                try {
                    await createLead(data);
                    (get() as LeadsStoreInternal).showToastInternal("Lead created", "success");
                    await get().fetchLeads();
                    return true;
                } catch (e) {
                    set({ error: e instanceof Error ? e.message : "Failed to create lead" }, false, "leads/createError");
                    return false;
                }
            },

            updateLead: async (id: string, data: Partial<LeadFormData>): Promise<boolean> => {
                try {
                    await updateLead(id, data);
                    (get() as LeadsStoreInternal).showToastInternal("Lead updated", "success");
                    await get().fetchLeads();
                    return true;
                } catch (e) {
                    set({ error: e instanceof Error ? e.message : "Failed to update lead" }, false, "leads/updateError");
                    return false;
                }
            },

            deleteLead: async (id: string): Promise<boolean> => {
                set({ deleteLoading: true }, false, "leads/deleteStart");
                try {
                    await deleteLead(id);
                    (get() as LeadsStoreInternal).showToastInternal("Lead deleted", "success");
                    set({ deleteLoading: false, deletingLead: null, drawerLead: null }, false, "leads/deleteSuccess");
                    await get().fetchLeads();
                    return true;
                } catch (e) {
                    set({
                        deleteLoading: false,
                        error: e instanceof Error ? e.message : "Failed to delete lead",
                    }, false, "leads/deleteError");
                    return false;
                }
            },

            exportCSV: async () => {
                const { debouncedSearch: search, status, source, sort } = get();
                try {
                    const blob = await exportLeadsCSV({ search, status, source, sort });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "leads.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                } catch (e) {
                    set({ error: e instanceof Error ? e.message : "Failed to export CSV" }, false, "leads/exportError");
                }
            },

            /* ── Filters  */
            setSearch: (s: string) => {
                set({ search: s }, false, "leads/setSearch");
                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    set({ debouncedSearch: s, page: 1 }, false, "leads/debouncedSearch");
                    get().fetchLeads();
                }, 350);
            },

            setStatus: (s: LeadStatus | "") => { set({ status: s, page: 1 }, false, "leads/setStatus"); get().fetchLeads(); },
            setSource: (s: LeadSource | "") => { set({ source: s, page: 1 }, false, "leads/setSource"); get().fetchLeads(); },
            setSort:   (s: SortOrder)        => { set({ sort: s,   page: 1 }, false, "leads/setSort");   get().fetchLeads(); },
            setPage:   (p: number)           => { set({ page: p },            false, "leads/setPage");   get().fetchLeads(); },

            clearFilters: () => {
                set({ search: "", debouncedSearch: "", status: "", source: "", sort: "latest", page: 1 }, false, "leads/clearFilters");
                get().fetchLeads();
            },

            /* ── UI  */
            openCreateModal:      () => set({ modalOpen: true,  modalLead: null  }, false, "leads/openCreate"),
            openEditModal: (lead) => set({ modalOpen: true,  modalLead: lead  }, false, "leads/openEdit"),
            closeModal:           () => set({ modalOpen: false, modalLead: null  }, false, "leads/closeModal"),
            openDrawer:    (lead) => set({ drawerLead: lead                      }, false, "leads/openDrawer"),
            closeDrawer:          () => set({ drawerLead: null                   }, false, "leads/closeDrawer"),
            openDeleteConfirm: (lead) => set({ deletingLead: lead                }, false, "leads/openDelete"),
            closeDeleteConfirm:   () => set({ deletingLead: null                 }, false, "leads/closeDelete"),
            clearError:  () => set({ error: "" },  false, "leads/clearError"),
            clearToast:  () => set({ toast: null }, false, "leads/clearToast"),

            /* ── Private  */
            showToastInternal: (msg: string, type: "success" | "error") => {
                set({ toast: { msg, type } }, false, "leads/showToast");
                setTimeout(() => set({ toast: null }, false, "leads/clearToast"), 2500);
            },
        }),
        { name: "LeadsStore" }
    )
);

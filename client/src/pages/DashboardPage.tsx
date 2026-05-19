import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Lead, LeadFormData } from "@/types/lead";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useLeadsStore } from "@/store/useLeadsStore";

import Navbar from "@/components/layout/Navbar";
import FilterBar from "@/components/layout/FilterBar";
import StatsBar from "@/components/leads/StatsBar";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadModal from "@/components/leads/LeadModal";
import LeadDrawer from "@/components/leads/LeadDrawer";
import DeleteConfirm from "@/components/leads/DeleteConfirm";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import Toast from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { FileDown, UserRoundPlus } from "lucide-react";

const DashboardPage: FC = () => {
    const navigate = useNavigate();

    const auth   = useAuthStore((s) => s.auth);
    const logout = useAuthStore((s) => s.logout);

    const dark       = useThemeStore((s) => s.dark);
    const toggleDark = useThemeStore((s) => s.toggleDark);

    const leads         = useLeadsStore((s) => s.leads);
    const loading       = useLeadsStore((s) => s.loading);
    const error         = useLeadsStore((s) => s.error);
    const toast         = useLeadsStore((s) => s.toast);
    const page          = useLeadsStore((s) => s.page);
    const totalPages    = useLeadsStore((s) => s.totalPages);
    const total         = useLeadsStore((s) => s.total);

    const search        = useLeadsStore((s) => s.search);
    const status        = useLeadsStore((s) => s.status);
    const source        = useLeadsStore((s) => s.source);
    const sort          = useLeadsStore((s) => s.sort);

    const modalOpen         = useLeadsStore((s) => s.modalOpen);
    const modalLead         = useLeadsStore((s) => s.modalLead);
    const drawerLead        = useLeadsStore((s) => s.drawerLead);
    const deletingLead      = useLeadsStore((s) => s.deletingLead);
    const deleteLoading     = useLeadsStore((s) => s.deleteLoading);

    const fetchLeads        = useLeadsStore((s) => s.fetchLeads);
    const createLead        = useLeadsStore((s) => s.createLead);
    const updateLead        = useLeadsStore((s) => s.updateLead);
    const deleteLead        = useLeadsStore((s) => s.deleteLead);
    const exportCSV         = useLeadsStore((s) => s.exportCSV);
    const setSearch         = useLeadsStore((s) => s.setSearch);
    const setStatus         = useLeadsStore((s) => s.setStatus);
    const setSource         = useLeadsStore((s) => s.setSource);
    const setSort           = useLeadsStore((s) => s.setSort);
    const setPage           = useLeadsStore((s) => s.setPage);
    const clearFilters      = useLeadsStore((s) => s.clearFilters);
    const openCreateModal   = useLeadsStore((s) => s.openCreateModal);
    const openEditModal     = useLeadsStore((s) => s.openEditModal);
    const closeModal        = useLeadsStore((s) => s.closeModal);
    const openDrawer        = useLeadsStore((s) => s.openDrawer);
    const closeDrawer       = useLeadsStore((s) => s.closeDrawer);
    const openDeleteConfirm = useLeadsStore((s) => s.openDeleteConfirm);
    const closeDeleteConfirm = useLeadsStore((s) => s.closeDeleteConfirm);
    const clearError        = useLeadsStore((s) => s.clearError);

    const isAdmin = auth?.user.role === "admin";

    useEffect(() => {
        if (!auth) navigate("/login", { replace: true });
    }, [auth, navigate]);

    useEffect(() => {
        fetchLeads();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!auth) return null;

    const handleSave = async (data: LeadFormData) => {
        const ok = modalLead
            ? await updateLead(modalLead._id, data)
            : await createLead(data);
        if (ok) closeModal();
    };

    const handleDelete = async () => {
        if (!deletingLead) return;
        await deleteLead(deletingLead._id);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const handleDrawerEdit = () => {
        if (drawerLead) { openEditModal(drawerLead); closeDrawer(); }
    };

    const handleDrawerDelete = () => {
        if (drawerLead) { openDeleteConfirm(drawerLead); closeDrawer(); }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar
                user={auth.user}
                dark={dark}
                onToggleDark={toggleDark}
                onLogout={handleLogout}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1
                            className="text-2xl font-bold text-gray-900 dark:text-white"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Leads
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {total} total leads
                        </p>
                    </div>

					<div className="flex gap-2">
						<Button
							variant="secondary"
							icon={<FileDown size={16} />}
							onClick={exportCSV}
						>
							<span className="hidden sm:inline">Export CSV</span>
						</Button>


						<Button
							variant="primary"
							icon={<UserRoundPlus size={16} />}
							onClick={openCreateModal}
						>
							New Lead
						</Button>
					</div>
				</div>

                <StatsBar leads={leads} />

                <FilterBar
                    search={search}
                    status={status}
                    source={source}
                    sort={sort}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                    onSourceChange={setSource}
                    onSortChange={setSort}
                    onClear={clearFilters}
                />

                <LeadsTable
                    leads={leads}
                    loading={loading}
                    isAdmin={isAdmin}
                    page={page}
                    pages={totalPages}
                    total={total}
                    onPageChange={setPage}
                    onView={(lead: Lead) => openDrawer(lead)}
                    onEdit={(lead: Lead) => openEditModal(lead)}
                    onDelete={(lead: Lead) => openDeleteConfirm(lead)}
                />
            </div>

            {error && <ErrorOverlay msg={error} onClose={clearError} />}
            {toast && <Toast msg={toast.msg} type={toast.type} />}

            {modalOpen && (
                <LeadModal
                    lead={modalLead}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}

            {drawerLead && (
                <LeadDrawer
                    lead={drawerLead}
                    isAdmin={isAdmin}
                    onClose={closeDrawer}
                    onEdit={handleDrawerEdit}
                    onDelete={handleDrawerDelete}
                />
            )}

            {deletingLead && (
                <DeleteConfirm
                    name={deletingLead.name}
                    loading={deleteLoading}
                    onConfirm={handleDelete}
                    onCancel={closeDeleteConfirm}
                />
            )}
        </div>
    );
};

export default DashboardPage;

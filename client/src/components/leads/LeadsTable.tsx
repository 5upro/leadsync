import type { FC } from "react";
import type { Lead } from "@/types/lead";
import { SkeletonRow } from "@/components/ui/Skeleton";
import LeadRow from "@/components/leads/LeadRow";
import PaginationBar from "@/components/ui/PaginationBar";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  isAdmin: boolean;
  page: number;
  pages: number;
  total: number;
  onPageChange: (p: number) => void;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const COLUMNS = ["Name", "Email", "Status", "Source", "Created", ""];

const LeadsTable: FC<LeadsTableProps> = ({
  leads, loading, isAdmin,
  page, pages, total, onPageChange,
  onView, onEdit, onDelete,
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            {COLUMNS.map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : leads.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">🔍</span>
                  <p className="font-medium text-gray-700 dark:text-gray-300">No leads found</p>
                  <p className="text-sm text-gray-400">Try adjusting your filters or adding a new lead</p>
                </div>
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <LeadRow
                key={lead._id}
                lead={lead}
                isAdmin={isAdmin}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>

    <PaginationBar page={page} pages={pages} total={total} onPageChange={onPageChange} />
  </div>
);

export default LeadsTable;

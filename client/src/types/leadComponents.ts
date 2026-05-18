import type { Lead, LeadFormData } from "./lead";

export interface LeadRowProps {
  lead: Lead;
  isAdmin: boolean;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export interface LeadModalProps {
  lead: Lead | null;
  onClose: () => void;
  onSave: (data: LeadFormData) => Promise<void>;
}

export interface LeadDrawerProps {
  lead: Lead;
  isAdmin: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface DeleteConfirmProps {
  name: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

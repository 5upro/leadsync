import type { 
	LeadSource, 
	LeadStatus 
} from "@/types/lead";

export const STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "lost"];
export const SOURCES: LeadSource[]  = ["website", "instagram", "referral"];
export const PAGE_SIZE               = 10;

export const STATUS_COLOR: Record<LeadStatus, string> = {
	new:       "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
	contacted: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
	qualified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
	lost:      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export const SOURCE_ICON: Record<LeadSource, string> = {
	website:   "🌐",
	instagram: "📸",
	referral:  "🤝",
};

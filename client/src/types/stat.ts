import type { LeadStatus } from "@/types/lead";

export interface StatusBadgeProps {
	status: LeadStatus;
}

export interface StatCardProps {
	label: string;
	value: number;
	icon: string;
	gradient: string;
}

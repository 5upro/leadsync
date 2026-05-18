import type { LeadStatus } from "@/types/lead";
import type { LucideIcon } from "lucide-react";

export interface StatusBadgeProps {
	status: LeadStatus;
}

export interface StatCardProps {
	label: string;
	value: number;
	icon: LucideIcon;
	className?: string;
}

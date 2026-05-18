export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type LeadSource = "website" | "instagram" | "referral";

export interface Lead {
	_id: string,
	name: string,
	email: string,
	status: LeadStatus,
	source: LeadSource,
	createdBy: string
	createdAt: string
	updatedAt: string,
}

export type LeadFormData = Omit<Lead, "_id" | "createdBy" | "createdAt" | "updatedAt">;

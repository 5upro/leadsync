import { Document, Types } from "mongoose";
import { z } from "zod";

export const LeadStatusEnum = z.enum(["new", "contacted", "qualified", "lost"]);
export const LeadSourceEnum = z.enum(["website", "instagram", "referral"]);

export type LeadStatus = z.infer<typeof LeadStatusEnum>;
export type LeadSource = z.infer<typeof LeadSourceEnum>;

export interface ILead extends Document {
	name: string
	email: string
	status: LeadStatus
	source: LeadSource
	createdBy: Types.ObjectId
}

export const LeadResponseSchema = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string(),
	status: LeadStatusEnum,
	source: LeadSourceEnum,
	createdBy: z.string(),
	createdAt: z.string().or(z.date()),
	updatedAt: z.string().or(z.date())
});

export const CreateLeadSchema = z.object({
	name: z.string().min(1, "Name is required").trim(),
	email: z.string().email("Invalid email"),
	status: LeadStatusEnum.default("new"),
	source: LeadSourceEnum,
});

export const LeadsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(10),
	status: LeadStatusEnum.optional(),
	source: LeadSourceEnum.optional(),
	search: z.string().trim().optional(),
	sort: z.enum(["latest", "oldest"]).default("latest")
});

export interface LeadFilter {
	status?: ILead["status"]
	source?: ILead["source"]
	$or?: Array<{ name?: object; email?: object }>
}

export const UpdateLeadSchema = z.object({
	name: z.string().min(1).trim(),
	email: z.string().email(),
	status: LeadStatusEnum,
	source: LeadSourceEnum,
}).partial();

export type LeadResponse		= z.infer<typeof LeadResponseSchema>;
export type CreateLeadPayload	= z.infer<typeof CreateLeadSchema>;
export type LeadsQueryPayload	= z.infer<typeof LeadsQuerySchema>
export type UpdateLeadPayload	= z.infer<typeof UpdateLeadSchema>;

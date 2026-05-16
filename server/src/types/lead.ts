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

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email"),
  status: LeadStatusEnum.default("new"),
  source: LeadSourceEnum,
});

export const updateLeadSchema = z.object({
  name: z.string().min(1).trim(),
  email: z.string().email(),
  status: LeadStatusEnum,
  source: LeadSourceEnum,
}).partial();

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

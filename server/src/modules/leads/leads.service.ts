import { Lead } from "@/models/Lead";
import {
	LeadResponseSchema,
	type CreateLeadPayload,
	type LeadResponse,
} from "@/types/lead";

export const createLeadService = async (
	data: CreateLeadPayload,
	userId: string
): Promise<LeadResponse> => {
	const lead = await Lead.create({ ...data, createdBy: userId });
	return LeadResponseSchema.parse({
		...lead.toObject(),
		_id: lead._id.toString(),
		createdBy: lead.createdBy.toString()
	});
}

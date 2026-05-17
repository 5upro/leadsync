import { Lead } from "@/models/Lead";
import {
	LeadResponseSchema,
    type LeadFilter,
	type LeadsQueryPayload,
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

export const getLeadsService = async (query: LeadsQueryPayload) => {
	const { page, limit, status, source, search, sort } = query

	const filter: LeadFilter = {}

	if (status) filter.status = status
	if (source) filter.source = source
	if (search) {
		filter.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } }
		]
	}

	const sortOrder = sort === "oldest" ? 1 : -1
	const skip = (page - 1) * limit

	const [leads, total] = await Promise.all([
		Lead.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(limit),
		Lead.countDocuments(filter)
	])

	return {
		leads,
		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			hasNextPage: page < Math.ceil(total / limit),
			hasPrevPage: page > 1
		}
	}
}

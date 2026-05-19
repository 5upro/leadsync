import { Lead } from "@/models/Lead";
import {
	LeadResponseSchema,
    type LeadFilter,
	type LeadsQueryPayload,
	type CreateLeadPayload,
	type LeadResponse,
    type UpdateLeadPayload,
} from "@/types/lead";
import { AppError } from "@/utils/error";
import mongoose from "mongoose";

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

export const exportLeadsCSVService = async (query: Omit<LeadsQueryPayload, "page" | "limit">) => {
    const { status, source, search, sort } = query;
    const filter: LeadFilter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }
    const sortOrder = sort === "oldest" ? 1 : -1;
    const leads = await Lead.find(filter).sort({ createdAt: sortOrder });

    const headers = ["ID", "Name", "Email", "Status", "Source", "Created At"];
    const rows = leads.map(lead => [
        lead._id.toString(),
        lead.name,
        lead.email,
        lead.status,
        lead.source,
        lead.createdAt.toISOString()
    ]);

    const csv = [headers, ...rows]
        .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    return csv;
};

export const getLeadById = async (id: string) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Invalid lead ID", 400)
	}
	const lead = await Lead.findById(id)
	if (!lead) throw new AppError("Lead not found", 404)
	return lead
}

export const updateLead = async (
	id: string,
	payload: UpdateLeadPayload,
	userId: string,
	role: string
) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Invalid lead ID", 400)
	}
	const lead = await Lead.findById(id)
	if (!lead) throw new AppError("Lead not found", 404)

	if (role !== "admin" && lead.createdBy.toString() !== userId) {
		throw new AppError("Unauthorized", 403)
	}

	return await Lead.findByIdAndUpdate(id, { $set: payload }, { new: true })
}

export const deleteLead = async (id: string, role: string) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError("Invalid lead ID", 400)
	}
	const lead = await Lead.findById(id)
	if (!lead) throw new AppError("Lead not found", 404)

	if (role !== "admin") {
		throw new AppError("Only admins can delete leads", 403)
	}

	await Lead.findByIdAndDelete(id)
}

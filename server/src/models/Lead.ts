import mongoose, { Schema } from "mongoose";
import { ILead } from "@/types/lead";

const leadSchema = new Schema<ILead>(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		status: {
			type: String,
			enum: ["new", "contacted", "qualified", "lost"],
			default: "new"
		},
		source: {
			type: String,
			enum: ["website", "instagram", "referral"],
			required: true
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		}
	},
	{ timestamps: true }
)

export const Lead = mongoose.model<ILead>("Lead", leadSchema);

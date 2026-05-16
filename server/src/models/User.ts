import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types/user";

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true
		},
		passwordHash: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "sales"],
			default: "sales"
		}
	},
	{ timestamps: true }
)

export const User = mongoose.model<IUser>("User", userSchema);

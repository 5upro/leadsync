import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "@/types/token";

const refreshTokenSchema = new Schema<IRefreshToken>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		tokenHash: {
			type: String,
			required: true,
			unique: true
		},
		isRevoked: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

export const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);

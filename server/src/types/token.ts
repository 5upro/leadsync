import { Document, Types } from "mongoose"
import { z } from "zod"
import { RoleEnum } from "@/types/user";

export interface IRefreshToken extends Document {
	userId: Types.ObjectId
	tokenHash: string
	isRevoked: boolean
}

export const AccessTokenPayloadSchema = z.object({
	userId: z.string(),
	role: RoleEnum
});

export const RefreshTokenPayloadSchema = z.object({
	userId: z.string()
});

export const RefreshTokenSchema = z.object({
    token: z.string(),
});

export type AccessTokenPayload	= z.infer<typeof AccessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof RefreshTokenPayloadSchema>;

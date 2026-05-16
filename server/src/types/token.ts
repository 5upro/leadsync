import { Document, Types } from "mongoose"
import { z } from "zod"
import { RoleEnum } from "@/types/user";

export interface IRefreshToken extends Document {
	userId: Types.ObjectId
	tokenHash: string
	isRevoked: boolean
}

export const accessTokenPayloadSchema = z.object({
	userId: z.string(),
	role: RoleEnum
})

export const refreshTokenPayloadSchema = z.object({
	userId: z.string()
})

export type AccessTokenPayload	= z.infer<typeof accessTokenPayloadSchema>;
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;

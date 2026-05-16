import { z } from "zod";

export const RegisterPayloadSchema = z.object({
	name: z.string().toLowerCase(),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).max(32),
});

export const LoginPayloadSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).max(32),
});

export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;
export type LoginPayload	= z.infer<typeof LoginPayloadSchema>;

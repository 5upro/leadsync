import { Document } from "mongoose";
import { z } from "zod";

export const RoleEnum = z.enum(["admin", "sales"]);
export type Role = z.infer<typeof RoleEnum>;

export interface IUser extends Document {
	name: string
	email: string
	passwordHash: string
	role: Role
}

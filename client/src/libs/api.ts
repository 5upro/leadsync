import type { 
	AuthPayload, 
	LoginCredentials, 
	RegisterCredentials 
} from "@/types/auth";
import api from "@/libs/axios";

export async function login(creds: LoginCredentials): Promise<AuthPayload> {
	const { data } = await api.post<AuthPayload>("/auth/login", creds);
	return data;
}

export async function Register(creds: RegisterCredentials ): Promise<AuthPayload> {
	const { data } = await api.post<AuthPayload>("/auth/register", creds);
	return data;
}


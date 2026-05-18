export type UserRole = "admin" | "sales";

export interface User {
	name: string;
	email: string;
	role: UserRole;
}

export interface AuthPayload {
	message: string;
	statusCode: number;
	user: User;
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

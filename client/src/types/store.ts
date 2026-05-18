import type { 
	AuthPayload, 
	LoginCredentials, 
	RegisterCredentials 
} from "@/types/auth";

/* Auth Store
 */ 
export interface AuthState {
	auth: AuthPayload | null;
	authError: string;
	authLoading: boolean;
	// actions
	login: (creds: LoginCredentials) => Promise<boolean>;
	register: (creds: RegisterCredentials) => Promise<boolean>;
	logout: () => void;
	clearAuthError: () => void;
}

export interface ThemeState {
	dark: boolean;
	toggleDark: () => void;
}

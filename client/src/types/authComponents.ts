import type { AuthPayload } from "@/types/auth";

export type MatchState = "idle" | "match" | "mismatch";

export interface AuthPageProps {
	dark: boolean;
	onAuth: (payload: AuthPayload) => void;
	onToggleDark: () => void;
}

export interface AuthInputProps {
	label: string;
	id: string;
	type?: string;
	placeholder?: string;
	value: string;
	error?: string;
	onChange: (value: string) => void;
}

export interface ConfirmPasswordInputProps {
	value: string;
	password: string;
	error?: string;
	onChange: (value: string) => void;
}

export interface AuthBrandHeaderProps {
	subtitle: string;
}

export type AuthMode = "login" | "register";

export interface ModeToggleProps {
	mode: AuthMode;
	onChange: (mode: AuthMode) => void;
}

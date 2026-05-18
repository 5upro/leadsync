import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AuthState } from "@/types/store";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { login, register } from "@/libs/api";

/**
 * useAuthStore
 *
 * Zustand store for authentication state.
 *
 * Usage in any component (no Provider needed):
 *   const { auth, login, logout } = useAuthStore();
 *
 * Selective subscription (avoids unnecessary re-renders):
 *   const auth    = useAuthStore((s) => s.auth);
 *   const logout  = useAuthStore((s) => s.logout);
 */
export const useAuthStore = create<AuthState>()(
	devtools(
		(set) => ({
			auth: null,
			authError: "",
			authLoading: false,

			login: async (creds: LoginCredentials): Promise<boolean> => {
				set({ authLoading: true, authError: "" }, false, "auth/loginStart");
				try {
					const payload = await login(creds);
					set({ auth: payload, authLoading: false }, false, "auth/loginSuccess");
					return true;
				} catch (e) {
					set(
						{
							authLoading: false,
							authError: e instanceof Error ? e.message : "Login failed",
						},
						false,
						"auth/loginError"
					);
					return false;
				}
			},

			register: async (creds: RegisterCredentials): Promise<boolean> => {
				set({ authLoading: true, authError: "" }, false, "auth/registerStart");
				try {
					const payload = await register(creds);
					set({ auth: payload, authLoading: false }, false, "auth/registerSuccess");
					return true;
				} catch (e) {
					set(
						{
							authLoading: false,
							authError: e instanceof Error ? e.message : "Registration failed",
						},
						false,
						"auth/registerError"
					);
					return false;
				}
			},

			logout: () => set({ auth: null }, false, "auth/logout"),

			clearAuthError: () => set({ authError: "" }, false, "auth/clearError"),
		}),
		{ name: "AuthStore" }
	)
);

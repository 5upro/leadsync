import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { AuthState } from "@/types/store";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { login, register, logout } from "@/libs/api";

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
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
                        set({
                            authLoading: false,
                            authError: e instanceof Error ? e.message : "Login failed",
                        }, false, "auth/loginError");
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
                        set({
                            authLoading: false,
                            authError: e instanceof Error ? e.message : "Registration failed",
                        }, false, "auth/registerError");
                        return false;
                    }
                },

                logout: async (): Promise<void> => {
                    const auth = useAuthStore.getState().auth;
                    if (auth?.tokens.refreshToken) {
                        try {
                            await logout({ token: auth.tokens.refreshToken });
                        } catch {
                            // clear local state regardless
                        }
                    }
                    set({ auth: null }, false, "auth/logout");
                },

                clearAuthError: () => set({ authError: "" }, false, "auth/clearError"),
            }),
            {
                name: "leadsync-auth", // localStorage key
                partialize: (state) => ({ auth: state.auth }), // only persist auth, not loading/error
            }
        ),
        { name: "AuthStore" }
    )
);

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ThemeState } from "@/types/store";

/**
 * useThemeStore
 *
 * Zustand store for dark/light theme.
 *
 * Persisted to localStorage via the `persist` middleware so the user's
 * preference survives a page reload.
 *
 * Usage in any component:
 *   const { dark, toggleDark } = useThemeStore();
 *
 * Side effect: keeps `document.documentElement` class in sync
 * via a Zustand subscribe call in main.tsx (see setup comment there).
 */
export const useThemeStore = create<ThemeState>()(
	devtools(
		persist(
			(set, get) => ({
				dark: false,

				toggleDark: () => {
					const next = !get().dark;
					document.documentElement.classList.toggle("dark", next);
					set({ dark: next }, false, "theme/toggle");
				},
			}),
			{
				name: "smart-leads-theme", // localStorage key
				onRehydrateStorage: () => (state) => {
					if (state) {
						document.documentElement.classList.toggle("dark", state.dark);
					}
				},
			}
		),
		{ name: "ThemeStore" }
	)
);

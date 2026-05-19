import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { 
    AuthMode,
	LoginForm,
	RegisterForm,
	LoginCredentials, 
	RegisterCredentials, 
    FormErrors, 
} from "@/types/auth";

import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

import AuthBrandHeader from "@/components/auth/AuthBrandHeader";
import ModeToggle from "@/components/auth/ModeToggle";
import AuthInput from "@/components/auth/AuthInput";
import ConfirmPasswordInput from "@/components/auth/ConfirmPasswordInput";
import Button from "@/components/ui/Button";
import { Moon, Sun } from "lucide-react";

const AuthPage: FC = () => {
	const navigate = useNavigate();

	const login        = useAuthStore((s) => s.login);
	const register     = useAuthStore((s) => s.register);
	const authError    = useAuthStore((s) => s.authError);
	const authLoading  = useAuthStore((s) => s.authLoading);
	const clearAuthError = useAuthStore((s) => s.clearAuthError);

	const dark       = useThemeStore((s) => s.dark);
	const toggleDark = useThemeStore((s) => s.toggleDark);

	const [mode, setMode] = useState<AuthMode>("login");

	const [loginForm, setLoginForm] = useState<LoginForm>({
		email: "",
		password: "",
	});

	const [regForm, setRegForm] = useState<RegisterForm>({
		name: "", email: "", password: "", confirm: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});

	const switchMode = (m: AuthMode) => {
		setMode(m);
		setErrors({});
		clearAuthError();
	};

	/* All Validation helpers
	 */
	const validateLogin = (): boolean => {
		const e: FormErrors = {};
		if (!loginForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
		if (loginForm.password.length < 8) e.password = "Min 8 characters";
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const validateRegister = (): boolean => {
		const e: FormErrors = {};
		if (!regForm.name.trim()) e.name = "Name is required";
		if (!regForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
		if (regForm.password.length < 8) e.password = "Min 8 characters";
		if (regForm.confirm !== regForm.password) e.confirm = "Passwords do not match";
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	/* Submit handlers
	 */
	const handleSubmit = async () => {
		if (mode === "login") {
			if (!validateLogin()) return;
			const ok = await login(loginForm as LoginCredentials);
			if (ok) navigate("/dashboard", { replace: true });
		} else {
			if (!validateRegister()) return;
			const { confirm: _confirm, ...creds } = regForm;
			const ok = await register(creds as RegisterCredentials);
			if (ok) navigate("/dashboard", { replace: true });
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
			{/* Theme toggle */}
			<button
				onClick={toggleDark}
				className="fixed top-5 right-5 p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:scale-105 transition-all shadow-sm"
				aria-label="Toggle theme"
			>
				{dark ? (<Sun/>) : (<Moon/>) }
			</button>

			<div className="w-full max-w-md">
				<AuthBrandHeader
					subtitle={
						mode === "login"
							? "Welcome back, sign in to continue"
							: "Create your account"
					}
				/>

				<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl shadow-gray-100 dark:shadow-none">
					<ModeToggle mode={mode} onChange={switchMode} />

					<div className="space-y-4">
						{mode === "register" && (
							<AuthInput
								label="Full Name"
								id="name"
								placeholder="John Doe"
								value={regForm.name}
								error={errors.name}
								onChange={(v) => setRegForm((f) => ({ ...f, name: v }))}
							/>
						)}

						<AuthInput
							label="Email"
							id="email"
							type="email"
							placeholder="you@example.com"
							value={mode === "login" ? loginForm.email : regForm.email}
							error={errors.email}
							onChange={(v) =>
								mode === "login"
									? setLoginForm((f) => ({ ...f, email: v }))
									: setRegForm((f) => ({ ...f, email: v }))
							}
						/>

						<AuthInput
							label="Password"
							id="password"
							type="password"
							placeholder="••••••••"
							value={mode === "login" ? loginForm.password : regForm.password}
							error={errors.password}
							onChange={(v) =>
								mode === "login"
									? setLoginForm((f) => ({ ...f, password: v }))
									: setRegForm((f) => ({ ...f, password: v }))
							}
						/>

						{mode === "register" && (
							<ConfirmPasswordInput
								value={regForm.confirm}
								password={regForm.password}
								error={errors.confirm}
								onChange={(v) => setRegForm((f) => ({ ...f, confirm: v }))}
							/>
						)}

						{authError && (
							<p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-xl">
								{authError}
							</p>
						)}

						<Button
							variant="primary"
							className="w-full mt-2"
							loading={authLoading}
							onClick={handleSubmit}
						>
							{mode === "login" ? "Sign In" : "Create Account"}
						</Button>
					</div>
				</div>

				<p className="text-center text-xs text-gray-400 mt-6">
					Demo: admin@example.com / password123
				</p>
			</div>
		</div>
	);
};

export default AuthPage;

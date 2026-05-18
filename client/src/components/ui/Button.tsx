import type { FC } from "react";
import type { 
	ButtonProps, 
	ButtonVariant, 
	ButtonSize, 
} from "@/types/button";

const VARIANT_CLS: Record<ButtonVariant, string> = {
	primary:
	"bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-600 hover:to-indigo-700",
	secondary:
	"border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800",
	danger:
	"border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
	ghost:
	"text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
};

const SIZE_CLS: Record<ButtonSize, string> = {
	sm: "px-3 py-2 text-xs rounded-lg",
	md: "px-4 py-2.5 text-sm rounded-xl",
};

const Spinner: FC = () => (
	<span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70" />
);

const Button: FC<ButtonProps> = ({
	variant = "secondary",
	size = "md",
	loading = false,
	icon,
	children,
	disabled,
	className = "",
	...rest
}) => (
		<button
			disabled={disabled || loading}
			className={`
inline-flex items-center justify-center gap-2 font-medium transition-all
disabled:opacity-50 disabled:cursor-not-allowed
${VARIANT_CLS[variant]} ${SIZE_CLS[size]} ${className}
`}
			{...rest}
		>
			{loading ? <Spinner /> : icon ?? null}
			{children}
		</button>
	);

export default Button;

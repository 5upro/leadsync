import { useState, useEffect, useRef, type FC } from "react";
import type { 
	ConfirmPasswordInputProps, 
	MatchState, 
} from "@/types/authComponents";

const ConfirmPasswordInput: FC<ConfirmPasswordInputProps> = ({
	value, password, error, onChange,
}) => {
	const [match, setMatch] = useState<MatchState>("idle");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		if (!value) { setMatch("idle"); return; }

		setMatch("idle");
		timerRef.current = setTimeout(() => {
			setMatch(value === password ? "match" : "mismatch");
		}, 300);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [value, password]);

	const borderCls =
		error || match === "mismatch"
			? "border-red-400"
			: match === "match"
				? "border-emerald-400"
				: "border-gray-200 dark:border-gray-700";

	return (
		<div>
			<label
				htmlFor="confirm-password"
				className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5"
			>
				Confirm Password
			</label>

			<div className="relative">
				<input
					id="confirm-password"
					type="password"
					value={value}
					placeholder="••••••••"
					onChange={(e) => onChange(e.target.value)}
					className={`
						w-full px-4 py-2.5 pr-10 rounded-xl text-sm
						bg-gray-50 dark:bg-gray-800 border ${borderCls}
						text-gray-900 dark:text-white
						focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition
					`}
				/>

				{match !== "idle" && (
					<span
						className={`
							absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold transition-all 
							${ match === "match" ? "text-emerald-500" : "text-red-500"}
                        `}
					>
						{match === "match" ? "✓" : "✕"}
					</span>
				)}
			</div>

			{match === "mismatch" && !error && (
				<p className="text-xs text-red-500 mt-1">Passwords don't match</p>
			)}
			{match === "match" && (
				<p className="text-xs text-emerald-500 mt-1">Passwords match</p>
			)}
			{error && <p className="text-xs text-red-500 mt-1">{error}</p>}
		</div>
	);
};

export default ConfirmPasswordInput;

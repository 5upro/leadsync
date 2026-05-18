import type { FC } from "react";
import type { ToastProps } from "@/types/toast";

const Toast: FC<ToastProps> = ({ msg, type = "success" }) => (
	<div
		className={`
			fixed bottom-6 right-6 z-50 flex items-center gap-3
			px-5 py-3 rounded-xl shadow-xl text-sm font-medium
			animate-slideUp
			${type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}
		`}
	>
		<span>{type === "success" ? "✓" : "✕"}</span>
		{msg}
	</div>
);

export default Toast;

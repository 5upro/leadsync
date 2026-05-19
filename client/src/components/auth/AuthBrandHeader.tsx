import type { FC } from "react";
import { BookUser } from "lucide-react";
import type { AuthBrandHeaderProps } from "@/types/authComponents";

const AuthBrandHeader: FC<AuthBrandHeaderProps> = ({ subtitle }) => (
	<div className="text-center mb-8">
		<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
			<BookUser className="w-7 h-7 text-white" />
		</div>
		<h1
			className="text-2xl font-bold text-gray-900 dark:text-white"
			style={{ fontFamily: "'DM Sans', sans-serif" }}
		>
			Leadsync
		</h1>
		<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
	</div>
);

export default AuthBrandHeader;

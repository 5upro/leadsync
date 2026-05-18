import type { FC } from "react";
import type { 
	AuthMode, 
	ModeToggleProps, 
} from "@/types/authComponents";

const ModeToggle: FC<ModeToggleProps> = ({ mode, onChange }) => (
	<div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
		{(["login", "register"] as AuthMode[]).map((m) => (
			<button
				key={m}
				onClick={() => onChange(m)}
				className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all capitalize
					${
						mode === m
							? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
							: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }	
				`}
			>
				{m}
			</button>
		))}
	</div>
);

export default ModeToggle;

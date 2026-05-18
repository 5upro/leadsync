import type { FC } from "react";
import Button from "@/components/ui/Button";
import { TriangleAlert } from "lucide-react";

interface ErrorOverlayProps {
	msg: string;
	onClose: () => void;
}

const ErrorOverlay: FC<ErrorOverlayProps> = ({ msg, onClose }) => (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
		<div className="bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
			<div className="flex items-center gap-3 mb-3">
				<div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-500 text-xl">
					<TriangleAlert />
				</div>
				<p className="font-semibold text-gray-900 dark:text-white">Something went wrong</p>
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{msg}</p>
			<Button variant="primary" className="w-full bg-red-500 hover:bg-red-600 from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" onClick={onClose}>
				Dismiss
			</Button>
		</div>
	</div>
);

export default ErrorOverlay;

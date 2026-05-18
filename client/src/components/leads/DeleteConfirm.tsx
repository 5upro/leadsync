import type { FC } from "react";
import type { DeleteConfirmProps } from "../../types/leadComponents";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

const DeleteConfirm: FC<DeleteConfirmProps> = ({ name, loading, onConfirm, onCancel }) => (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
		<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 max-w-sm w-full">
			<div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
				<Trash2 size={32} className="text-red-500" />

			</div>
			<h3 className="text-center font-semibold text-gray-900 dark:text-white mb-2">Delete Lead</h3>
			<p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
				Remove{" "}
				<span className="font-medium text-gray-700 dark:text-gray-200">{name}</span>? This can't be undone.
			</p>
			<div className="flex gap-3">
				<Button variant="secondary" className="flex-1" onClick={onCancel}>
					Cancel
				</Button>
				<Button
					variant="primary"
					className="flex-1 from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/20"
					loading={loading}
					onClick={onConfirm}
				>
					Delete
				</Button>
			</div>
		</div>
	</div>
);

export default DeleteConfirm;

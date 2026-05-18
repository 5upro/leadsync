import { 
	useState, 
	type FC, 
	type ChangeEvent 
} from "react";
import type { LeadModalProps } from "@/types/leadComponents";
import type { LeadFormData } from "@/types/lead";
import type { LeadStatus, LeadSource } from "@/types/lead";
import { STATUSES, SOURCES } from "@/libs/constants";
import Button from "@/components/ui/Button";
import { X } from "lucide-react";

type FormErrors = Partial<Record<keyof LeadFormData, string>>;

const LeadModal: FC<LeadModalProps> = ({ lead, onClose, onSave }) => {
	const [form, setForm] = useState<LeadFormData>({
		name:   lead?.name   ?? "",
		email:  lead?.email  ?? "",
		status: lead?.status ?? "new",
		source: lead?.source ?? "website",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [saving, setSaving] = useState(false);

	const set = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) =>
		setForm((prev) => ({ ...prev, [key]: value }));

	const validate = (): boolean => {
		const e: FormErrors = {};
		if (!form.name.trim())  e.name  = "Name is required";
		if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const handleSave = async () => {
		if (!validate()) return;
		setSaving(true);
		await onSave(form);
		setSaving(false);
	};

	const inputCls = (field: keyof FormErrors) =>
		`w-full px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border
		${errors[field] ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
		text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition`;

	return (
		<div
			className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn"
			onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
		>
			<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-lg">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
					<h2 className="font-semibold text-gray-900 dark:text-white">
						{lead ? "Edit Lead" : "New Lead"}
					</h2>
					<button
						onClick={onClose}
						className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
					>
						<X/>
					</button>
				</div>

				{/* Body */}
				<div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
					{/* Name */}
					<div>
						<label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
							Name <span className="text-red-400">*</span>
						</label>
						<input
							value={form.name}
							onChange={(e: ChangeEvent<HTMLInputElement>) => set("name", e.target.value)}
							className={inputCls("name")}
							placeholder="Full name"
						/>
						{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
					</div>

					{/* Email */}
					<div>
						<label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
							Email <span className="text-red-400">*</span>
						</label>
						<input
							type="email"
							value={form.email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => set("email", e.target.value)}
							className={inputCls("email")}
							placeholder="email@example.com"
						/>
						{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
					</div>

					{/* Status + Source */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
							<select
								value={form.status}
								onChange={(e: ChangeEvent<HTMLSelectElement>) => set("status", e.target.value as LeadStatus)}
								className={inputCls("status")}
							>
								{STATUSES.map((s) => <option key={s}>{s}</option>)}
							</select>
						</div>
						<div>
							<label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Source</label>
							<select
								value={form.source}
								onChange={(e: ChangeEvent<HTMLSelectElement>) => set("source", e.target.value as LeadSource)}
								className={inputCls("source")}
							>
								{SOURCES.map((s) => <option key={s}>{s}</option>)}
							</select>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
					<Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
					<Button variant="primary" className="flex-1" loading={saving} onClick={handleSave}>
						Save Lead
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LeadModal;

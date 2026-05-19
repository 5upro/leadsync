import type { FC } from "react";
import type { Lead } from "@/types/lead";
import StatCard from "@/components/ui/StatCard";
import { 
	UserRound,
	Sparkles, 
	UserRoundCheck,
	UserRoundX,
} from "lucide-react";

interface StatsBarProps {
	leads: Lead[];
}

const StatsBar: FC<StatsBarProps> = ({ leads }) => {
	const count = (status: string): number =>
		leads.filter((l) => l.status === status).length;

	const cards = [
		{ label: "Total Leads",		value: leads.length,		icon: UserRound,		className: "text-violet-500" },
		{ label: "New Leads",		value: count("new"),		icon: Sparkles,			className: "text-blue-500" },
		{ label: "Qualified Leads", value: count("qualified"),	icon: UserRoundCheck,	className: "text-emerald-500" },
		{ label: "Lost Leads",		value: count("lost"),		icon: UserRoundX,		className: "text-red-500" },
	];

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
			{cards.map((c) => (
				<StatCard key={c.label} {...c} />
			))}
		</div>
	);
};

export default StatsBar;

import type { FC } from "react";
import { BookUser } from "lucide-react";

const SplashScreen: FC = () => (
	<div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center">
		<div className="relative mb-8">
			<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.5)]">
				<BookUser className="w-10 h-10 text-white" />
			</div>
			<div className="absolute -inset-2 rounded-3xl border border-violet-500/30 animate-ping opacity-50" />
		</div>

		<h1
			className="text-2xl font-bold text-white tracking-tight mb-2"
			style={{ fontFamily: "'DM Sans', sans-serif" }}
		>
			Leadsync
		</h1>
		<p className="text-gray-500 text-sm mb-10">Smart Lead Management Dashboard</p>

		<div className="flex gap-1.5">
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="w-2 h-2 rounded-full bg-violet-500 animate-bounce"
					style={{ animationDelay: `${i * 0.15}s` }}
				/>
			))}
		</div>
	</div>
);

export default SplashScreen;

import type { FC } from "react";
import type { NavbarProps } from "@/types/layout";
import { 
	BookUser, 
	LogOut, 
	Moon, 
	Sun 
} from "lucide-react";

const Navbar: FC<NavbarProps> = ({ user, dark, onToggleDark, onLogout }) => (
	<nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 sticky top-0 z-30">
		<div className="max-w-7xl mx-auto flex items-center justify-between">
			{/* Brand */}
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow shadow-violet-500/30">
					<BookUser className="w-4 h-4 text-white" />
				</div>
				<span
					className="font-bold text-gray-900 dark:text-white text-lg"
					style={{ fontFamily: "'DM Sans', sans-serif" }}
				>
					Smart Leads
				</span>
			</div>

			{/* Right controls */}
			<div className="flex items-center gap-3">
				{/* User pill */}
				<div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800">
					<div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
						{user.name[0]}
					</div>
					<div>
						<p className="text-xs font-medium text-gray-900 dark:text-white leading-none">
							{user.name}
						</p>
						<p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-0.5">
							{user.role}
						</p>
					</div>
				</div>

				<button
					onClick={onToggleDark}
					className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
					aria-label="Toggle theme"
				>
					{dark ? (<Sun/>) : (<Moon/>) }
				</button>

				<button
					onClick={onLogout}
					className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition"
					aria-label="Log out"
				>
					<LogOut/>
				</button>
			</div>
		</div>
	</nav>
);

export default Navbar;

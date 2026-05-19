/**
 * Routing: react-router-dom v6
 *
 * Routes:
 *   /login      → AuthPage
 *   /dashboard  → DashboardPage (protected)
 *   *           → redirect to /dashboard (ProtectedRoute redirects to /login if unauthed)
 */

import type { 
	FC, 
	ReactNode, 
} from "react";
import { 
	BrowserRouter, 
	Routes, 
	Route, 
	Navigate 
} from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const auth = useAuthStore((s) => s.auth);
	return auth ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRouter: FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<AuthPage/>} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<DashboardPage/>
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/dashboard" replace />} />
		</Routes>
	</BrowserRouter>
);

export default AppRouter;


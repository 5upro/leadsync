import { 
	useState, 
	useEffect, 
	type FC } from "react";
import AppRouter from "@/router/AppRouter";
import SplashScreen from "@/pages/SplashScreen";

/**
 * App Root
 */
const App: FC = () => {
	const [splash, setSplash] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setSplash(false), 2200);
		return () => clearTimeout(timer);
	}, []);

	if (splash) return <SplashScreen />;

	return <AppRouter />;
};

export default App;

import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

const authApi = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const auth = useAuthStore.getState().auth;
	if (auth?.tokens.accessToken) {
		config.headers.Authorization = `Bearer ${auth.tokens.accessToken}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const original = error.config;
		const auth = useAuthStore.getState().auth;

		if (error.response?.status === 401 && !original._retry && auth?.tokens.refreshToken) {
			original._retry = true;
			try {
				const { data } = await authApi.post("/auth/refresh", {
					token: auth.tokens.refreshToken,
				});
				useAuthStore.setState({ auth: data });
				original.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
				return api(original);
			} catch {
				useAuthStore.getState().logout();
			}
		}

		return Promise.reject(error);
	}
);

export default api;

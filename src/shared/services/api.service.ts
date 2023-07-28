import createAxiosInstance from "./axios.service";

const api = createAxiosInstance(`${import.meta.env.VITE_APP_API_URL}`);
export default api;

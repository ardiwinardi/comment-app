import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import storageService from "./storage.service";

export default function createAxiosInstance(baseURL: string) {
  const api = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 6000,
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = storageService.getToken();
      if (token) {
        Object.assign(config.headers, { Authorization: `Bearer ${token}` });
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if ((error as AxiosError).code === "ERR_NETWORK") {
        toast.warning("Tidak ada koneksi internet");
      } else {
        return Promise.reject(error.response?.data?.message ?? "Unknown Error");
      }
    }
  );
  return api;
}

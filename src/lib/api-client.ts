import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token and Accept-Language header if available
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const locale = typeof window !== "undefined" ? localStorage.getItem("app_locale") || "en-US" : "en-US";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Accept-Language"] = locale;
  return config;
});

// Response interceptor — unwrap data, handle errors uniformly
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? 0;
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new ApiError(status, message, error.response?.data));
  },
);

export class ApiError extends Error {
  public status: number;
  public data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<AxiosRequestConfig, "url" | "method">;

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    axiosInstance.get(endpoint, options) as unknown as Promise<T>,

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    axiosInstance.post(endpoint, body, options) as unknown as Promise<T>,

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    axiosInstance.put(endpoint, body, options) as unknown as Promise<T>,

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    axiosInstance.patch(endpoint, body, options) as unknown as Promise<T>,

  delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    axiosInstance.delete(endpoint, options) as unknown as Promise<T>,
};

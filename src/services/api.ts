
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// API base URL - replace with actual API URL when ready
const API_BASE_URL = "https://api.bookworm-library.com";
const API_VERSION = "v1-Beta";

// Flag to indicate if we're using mock data
const USE_MOCK_API = true;

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to set authorization header
export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

// Generic API request function
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  // Check if we're using mock API and should bypass actual API calls
  if (USE_MOCK_API) {
    // For mock data, we'll just return a promise that resolves immediately
    // This prevents actual API calls from being made during development
    return Promise.resolve({} as T);
  }
  
  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    // We could enhance this error handling in the future
    console.error("API request failed:", error);
    throw error;
  }
};

export default apiClient;

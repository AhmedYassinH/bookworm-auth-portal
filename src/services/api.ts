
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Genre } from "@/types/book";

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

// Mock data for development
const mockBookData = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    description: "The first novel in the Harry Potter series and Rowling's debut novel.",
    bookGenre: Genre.Fantasy,
    credit: 2,
    numberOfTotalCopies: 10,
    numberOfAvailableCopies: 7,
    imageURL: null,
    authors: [{ id: 1, name: "J.K. Rowling", bio: "British author best known for the Harry Potter series" }],
    publishers: [{ id: 1, name: "Bloomsbury Publishing", contactInfo: "info@bloomsbury.com" }],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "1984",
    description: "A dystopian novel published in 1949 by English author George Orwell.",
    bookGenre: Genre.ScienceFiction,
    credit: 3,
    numberOfTotalCopies: 8,
    numberOfAvailableCopies: 4,
    imageURL: null,
    authors: [{ id: 2, name: "George Orwell", bio: "English novelist and essayist" }],
    publishers: [{ id: 2, name: "Secker & Warburg", contactInfo: "contact@seckerandwarburg.com" }],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    description: "A romantic novel of manners written by Jane Austen in 1813.",
    bookGenre: Genre.Romance,
    credit: 2,
    numberOfTotalCopies: 6,
    numberOfAvailableCopies: 3,
    imageURL: null,
    authors: [{ id: 3, name: "Jane Austen", bio: "English novelist known for her six major novels" }],
    publishers: [{ id: 3, name: "T. Egerton", contactInfo: "info@tegerton.com" }],
    createdAt: new Date().toISOString()
  }
];

// Generic API request function with mock data
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  // Check if we're using mock API and should bypass actual API calls
  if (USE_MOCK_API) {
    console.log("Using mock API for:", config.url, config.method);
    
    // Return mock responses based on the endpoint and method
    if (config.url?.includes('/Book') && config.method?.toLowerCase() === 'get') {
      if (config.url.split('/').length > 2) {
        // Single book endpoint - return a single book
        const bookId = parseInt(config.url.split('/').pop() || '1');
        const book = mockBookData.find(b => b.id === bookId) || mockBookData[0];
        return book as unknown as T;
      } else {
        // All books endpoint - return the array of books
        return mockBookData as unknown as T;
      }
    }
    
    // Default mock response (empty array for collections, empty object for individual items)
    if (config.url?.includes('/Author') || 
        config.url?.includes('/Publisher') || 
        config.url?.includes('/Borrowing')) {
      return [] as unknown as T;
    }
    
    // For all other requests, return empty object
    return {} as T;
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


import { apiRequest } from "./api";
import { UserResponseDTO } from "@/types/user";
import { Role } from "@/types/auth";
import { Sex } from "@/types/user";
import { QueryParams } from "@/types/base";

// User API endpoints
const USER_ENDPOINTS = {
  GET_USER: (id: number) => `/User/${id}`,
  UPDATE_USER: (id: number) => `/User/${id}`,
  GET_USERS: "/User",
};

// Mock user data for development
const mockUserData: UserResponseDTO = {
  id: 1,
  name: "John Doe",
  bio: "Book lover and avid reader",
  birthDate: "1990-01-01",
  imageURL: null,
  address: "123 Book Street, Reading, RD 12345",
  userSex: Sex.Male,
  credit: 100,
  email: "john.doe@example.com",
  phone: "+1234567890",
  userRole: Role.User,
  createdAt: new Date().toISOString(),
};

export const userService = {
  // Get a user by ID
  getUser: async (userId: number): Promise<UserResponseDTO> => {
    return apiRequest<UserResponseDTO>({
      method: "GET",
      url: USER_ENDPOINTS.GET_USER(userId),
    });
  },

  // Get users with optional filtering and pagination
  getUsers: async (queryParams?: QueryParams): Promise<UserResponseDTO[]> => {
    return apiRequest<UserResponseDTO[]>({
      method: "GET",
      url: USER_ENDPOINTS.GET_USERS,
      params: queryParams,
    });
  },

  // Update a user
  updateUser: async (
    userId: number,
    userData: FormData,
    userRole: Role
  ): Promise<UserResponseDTO> => {
    // For regular users, remove credit and role fields to prevent 403 errors
    if (userRole !== Role.Admin) {
      // Create a new FormData object without the restricted fields
      const filteredData = new FormData();
      
      // Copy allowed fields from the original FormData
      for (const [key, value] of userData.entries()) {
        // Skip credit and userRole fields for non-admin users
        if (key !== 'Credit' && key !== 'UserRole') {
          filteredData.append(key, value);
        }
      }
      
      // Make sure to include the current UserRole in the request
      filteredData.append('UserRole', userRole);
      
      return apiRequest<UserResponseDTO>({
        method: "PUT",
        url: USER_ENDPOINTS.UPDATE_USER(userId),
        data: filteredData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    
    // For admin users, send all fields
    return apiRequest<UserResponseDTO>({
      method: "PUT",
      url: USER_ENDPOINTS.UPDATE_USER(userId),
      data: userData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default userService;

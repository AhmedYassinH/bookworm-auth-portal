
import { apiRequest } from './api';
import { UserResponseDTO } from '@/types/user';
import { Role } from '@/types/auth';
import { Sex } from '@/types/user';
import { QueryParams } from '@/types/base';

// User API endpoints
const USER_ENDPOINTS = {
  GET_USER: (id: number) => `/User/${id}`,
  UPDATE_USER: (id: number) => `/User/${id}`,
  GET_USERS: '/User',
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
  createdAt: new Date().toISOString()
};

export const userService = {
  // Get a user by ID
  getUser: async (userId: number): Promise<UserResponseDTO> => {
    // For mock development
    if (window.location.hostname === 'localhost' || true) {
      console.log('Using mock user data');
      return { ...mockUserData, id: userId };
    }
    
    return apiRequest<UserResponseDTO>({
      method: 'GET',
      url: USER_ENDPOINTS.GET_USER(userId),
    });
  },

  // Get users with optional filtering and pagination
  getUsers: async (queryParams?: QueryParams): Promise<UserResponseDTO[]> => {
    // For mock development
    if (window.location.hostname === 'localhost' || true) {
      console.log('Using mock user data for users list');
      return [mockUserData];
    }
    
    return apiRequest<UserResponseDTO[]>({
      method: 'GET',
      url: USER_ENDPOINTS.GET_USERS,
      params: queryParams,
    });
  },

  // Update a user
  updateUser: async (userId: number, userData: FormData): Promise<UserResponseDTO> => {
    // For mock development
    if (window.location.hostname === 'localhost' || true) {
      console.log('Mock updating user:', userData);
      return { 
        ...mockUserData, 
        id: userId,
        name: userData.get('Name') as string || mockUserData.name,
        bio: userData.get('Bio') as string || mockUserData.bio,
        address: userData.get('Address') as string || mockUserData.address,
        email: userData.get('Email') as string || mockUserData.email,
        phone: userData.get('Phone') as string || mockUserData.phone,
      };
    }
    
    return apiRequest<UserResponseDTO>({
      method: 'PUT',
      url: USER_ENDPOINTS.UPDATE_USER(userId),
      data: userData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default userService;


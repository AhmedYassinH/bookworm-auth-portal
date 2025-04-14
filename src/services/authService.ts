
import { apiRequest } from "./api";
import { 
  AuthResponseDTO, 
  LoginUserRequestDTO, 
  RegisterUserRequestDTO,
  UpdatePasswordRequestDTO,
  Role
} from "../types/auth";

const AUTH_ENDPOINTS = {
  REGISTER: "/Auth/Register",
  LOGIN: "/Auth/Login",
  CHANGE_PASSWORD: "/Auth/ChangePassword",
};

// Dummy admin credentials
const DUMMY_ADMIN = {
  email: "admin@bookworm.com",
  password: "Admin123!",
  userData: {
    userId: 1,
    userName: "Admin User",
    userRole: Role.Admin,
    imageUrl: null,
    accessToken: "dummy-token-for-development"
  }
};

export const authService = {
  register: async (data: RegisterUserRequestDTO): Promise<AuthResponseDTO> => {
    return apiRequest<AuthResponseDTO>({
      method: "POST",
      url: AUTH_ENDPOINTS.REGISTER,
      data,
    });
  },

  login: async (data: LoginUserRequestDTO): Promise<AuthResponseDTO> => {
    // For development: check if using dummy admin credentials
    if (data.email === DUMMY_ADMIN.email && data.password === DUMMY_ADMIN.password) {
      console.log("Using dummy admin account for development");
      const userData = { ...DUMMY_ADMIN.userData };
      authService.saveUserData(userData);
      return userData;
    }
    
    // Regular login flow
    return apiRequest<AuthResponseDTO>({
      method: "POST",
      url: AUTH_ENDPOINTS.LOGIN,
      data,
    });
  },

  changePassword: async (data: UpdatePasswordRequestDTO): Promise<AuthResponseDTO> => {
    return apiRequest<AuthResponseDTO>({
      method: "PUT",
      url: AUTH_ENDPOINTS.CHANGE_PASSWORD,
      data,
    });
  },

  logout: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  saveUserData: (userData: AuthResponseDTO): void => {
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
    }
    localStorage.setItem("user", JSON.stringify(userData));
  },

  getCurrentUser: (): AuthResponseDTO | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr) as AuthResponseDTO;
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },
};

export default authService;

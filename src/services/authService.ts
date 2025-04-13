
import { apiRequest } from "./api";
import { 
  AuthResponseDTO, 
  LoginUserRequestDTO, 
  RegisterUserRequestDTO,
  UpdatePasswordRequestDTO
} from "../types/auth";

const AUTH_ENDPOINTS = {
  REGISTER: "/Auth/Register",
  LOGIN: "/Auth/Login",
  CHANGE_PASSWORD: "/Auth/ChangePassword",
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

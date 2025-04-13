
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "../services/authService";
import { 
  AuthResponseDTO, 
  LoginUserRequestDTO, 
  RegisterUserRequestDTO,
  UpdatePasswordRequestDTO
} from "../types/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: AuthResponseDTO | null;
  loading: boolean;
  login: (data: LoginUserRequestDTO) => Promise<void>;
  register: (data: RegisterUserRequestDTO) => Promise<void>;
  changePassword: (data: UpdatePasswordRequestDTO) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data: LoginUserRequestDTO) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      authService.saveUserData(response);
      setUser(response);
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.userName || "User"}!`,
        variant: "default",
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterUserRequestDTO) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      authService.saveUserData(response);
      setUser(response);
      setIsAuthenticated(true);
      toast({
        title: "Registration successful",
        description: `Welcome to Bookworm, ${response.userName || "User"}!`,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "Unable to create your account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: UpdatePasswordRequestDTO) => {
    setLoading(true);
    try {
      const response = await authService.changePassword(data);
      authService.saveUserData(response);
      setUser(response);
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      console.error("Password change failed:", error);
      toast({
        title: "Failed to change password",
        description: "Please check your current password and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    changePassword,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

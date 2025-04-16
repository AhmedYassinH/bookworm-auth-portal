
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookOpen, Eye, EyeOff, Loader2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { LoginUserRequestDTO } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const loginData: LoginUserRequestDTO = {
        email: data.email,
        password: data.password,
      };
      await login(loginData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const loginAsAdmin = () => {
    form.setValue("email", "admin@admin.com");
    form.setValue("password", "StrongPassword123@");
    
    toast({
      title: "Admin credentials filled",
      description: "You can now sign in as an administrator.",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center w-full px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:px-12">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-10 w-10 text-bookworm-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Bookworm</span>
            </Link>
          </div>
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-bookworm-500 hover:text-bookworm-600"
              >
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-4 mb-6">
            <Button 
              type="button" 
              variant="outline"
              className="w-full flex items-center"
              onClick={loginAsAdmin}
            >
              <UserCog className="mr-2 h-4 w-4" />
              Fill admin credentials
            </Button>
          </div>

          <div className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-bookworm-500 hover:text-bookworm-600"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-bookworm-100">
          <div className="absolute inset-0 bg-gradient-to-r from-bookworm-50 to-bookworm-100 opacity-90"></div>
          <div className="flex h-full items-center justify-center p-12">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 h-72 w-72 bg-bookworm-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
              <div className="absolute top-0 -right-4 h-72 w-72 bg-bookworm-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: "2s" }}></div>
              <div className="absolute -bottom-8 left-20 h-72 w-72 bg-bookworm-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: "4s" }}></div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover a world of books</h3>
                  <p className="text-gray-600 mb-6">
                    Join our library management system and get access to thousands of books.
                    Borrow, read, and manage your reading list with ease.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-bookworm-50 p-4 rounded-lg">
                      <h4 className="font-bold text-bookworm-700 mb-1">10,000+</h4>
                      <p className="text-sm text-gray-600">Books available</p>
                    </div>
                    <div className="bg-bookworm-50 p-4 rounded-lg">
                      <h4 className="font-bold text-bookworm-700 mb-1">24/7</h4>
                      <p className="text-sm text-gray-600">Digital access</p>
                    </div>
                    <div className="bg-bookworm-50 p-4 rounded-lg">
                      <h4 className="font-bold text-bookworm-700 mb-1">Free</h4>
                      <p className="text-sm text-gray-600">Membership</p>
                    </div>
                    <div className="bg-bookworm-50 p-4 rounded-lg">
                      <h4 className="font-bold text-bookworm-700 mb-1">500+</h4>
                      <p className="text-sm text-gray-600">New books monthly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

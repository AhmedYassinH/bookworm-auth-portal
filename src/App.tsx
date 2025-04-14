
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Authors from "./pages/Authors";
import Publishers from "./pages/Publishers";
import Borrowings from "./pages/Borrowings";
import Dashboard from "./pages/Dashboard";

// Components
import PrivateRoute from "./components/auth/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} />
            
            {/* Protected routes */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/edit-profile" 
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/change-password" 
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/authors" 
              element={
                <PrivateRoute>
                  <Authors />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/publishers" 
              element={
                <PrivateRoute>
                  <Publishers />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/borrowings" 
              element={
                <PrivateRoute>
                  <Borrowings />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

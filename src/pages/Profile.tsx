
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Mail, Phone, MapPin, Calendar, CreditCard, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/userService";
import { UserResponseDTO, Sex } from "@/types/user";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Fetch user details
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => userService.getUser(user?.userId || 0),
    enabled: !!user?.userId,
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (err) {
      return "Invalid date";
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="space-y-6">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
              <CardDescription>
                We couldn't load your profile information. Please try again later.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="mb-6">
          <CardHeader className="relative">
            <div className="flex justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold">{profile?.name || "User"}</CardTitle>
                <CardDescription>
                  Member since {formatDate(profile?.createdAt)}
                </CardDescription>
              </div>
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={profile?.imageURL || ""} alt={profile?.name || "User"} />
                  <AvatarFallback className="text-3xl">
                    {profile?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleEditProfile}
                aria-label="Edit profile"
              >
                <Edit className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {profile?.bio && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
                <p className="text-sm">{profile.bio}</p>
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profile?.email || "No email provided"}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profile?.phone || "No phone provided"}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profile?.address || "No address provided"}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Birth date: {profile?.birthDate ? formatDate(profile.birthDate) : "Not provided"}</span>
                </div>
                
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    Sex: {profile?.userSex || "Not specified"}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Credits: {profile?.credit || 0}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Role</h3>
                <Badge variant={profile?.userRole === "Admin" ? "destructive" : "secondary"}>
                  {profile?.userRole}
                </Badge>
              </div>
              <Button onClick={handleChangePassword}>Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;

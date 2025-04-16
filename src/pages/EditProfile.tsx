
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save, ArrowLeft, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";
import { Sex } from "@/types/user";
import { Role } from "@/types/auth";

import Layout from "@/components/layout/Layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define schema for form validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  bio: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  userSex: z.nativeEnum(Sex),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch user details
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: () => userService.getUser(user?.userId || 0),
    enabled: !!user?.userId,
  });

  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      address: "",
      phone: "",
      birthDate: "",
      userSex: Sex.Male,
    },
  });

  // Update form when profile data is loaded
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || "",
        email: profile.email || "",
        bio: profile.bio || "",
        address: profile.address || "",
        phone: profile.phone || "",
        birthDate: profile.birthDate?.split("T")[0] || "",
        userSex: profile.userSex || Sex.Male,
      });

      if (profile.imageURL) {
        setImagePreview(profile.imageURL);
      }
    }
  }, [profile, form]);

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      if (!user?.userId) throw new Error("User ID not found");

      const formData = new FormData();
      // Required fields
      formData.append("Name", data.name);
      formData.append("Email", data.email);
      formData.append("UserSex", data.userSex.toString());

      // Optional fields - send empty string if not provided to match API schema
      formData.append("Bio", data.bio || "");
      formData.append("Address", data.address || "");
      formData.append("Phone", data.phone || "");
      formData.append("BirthDate", data.birthDate || "");

      // Required for concurrency control
      if (profile?.id) formData.append("Id", profile.id.toString());
      if (profile?.timeStamp) formData.append("TimeStamp", profile.timeStamp);

      // Image is optional but needs to be sent as binary
      if (imageFile) formData.append("Image", imageFile);

      // Pass the user role to the service so it can handle permissions correctly
      return userService.updateUser(user.userId, formData, user.userRole as Role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user?.userId] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      navigate("/profile");
    },
    onError: (error: { response?: { data?: { message?: string; error?: { message?: string } } } }) => {
      console.error("Failed to update profile:", error);
      const errorMessage = error?.response?.data?.error?.message || 
                          error?.response?.data?.message || 
                          "There was a problem updating your profile. Please try again.";
      
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-xl mx-auto py-8 px-4 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-xl mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-muted">
                  <AvatarImage src={imagePreview || ""} alt="Profile" />
                  <AvatarFallback className="text-3xl">
                    {form.getValues("name")?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="userSex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your sex" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={Sex.Male}>Male</SelectItem>
                            <SelectItem value={Sex.Female}>Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about yourself"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfile;

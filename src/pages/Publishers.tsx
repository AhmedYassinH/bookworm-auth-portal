
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { publisherService } from "@/services/publisherService";
import { PublisherResponseDTO } from "@/types/publisher";
import { QueryParams } from "@/types/base";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building, Search, Plus, Pencil, Trash, BookOpen } from "lucide-react";

const Publishers = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.userRole === "Admin";
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Query params for the API
  const queryParams: QueryParams = {
    pageSize: 100 // We'll improve this with pagination later
  };
  
  // Add filters if we have them
  if (searchTerm) {
    queryParams.filterOn = "name";
    queryParams.filterQuery = searchTerm;
  }
  
  // Fetch publishers
  const { data: publishers, isLoading, error, refetch } = useQuery({
    queryKey: ['publishers', queryParams],
    queryFn: () => publisherService.getPublishers(queryParams),
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Building className="mr-2" />
              Publishers
            </h1>
            <p className="text-muted-foreground">
              Browse and manage publishers in the library system.
            </p>
          </div>
          
          {isAdmin && (
            <Button>
              <Plus className="mr-2" size={16} />
              Add New Publisher
            </Button>
          )}
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search publishers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-destructive">Error loading publishers. Please try again later.</p>
          </div>
        ) : publishers && publishers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publishers.map((publisher) => (
              <Card key={publisher.id}>
                <CardHeader>
                  <CardTitle>{publisher.name}</CardTitle>
                  <CardDescription>
                    Added on {new Date(publisher.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Contact: {publisher.email || publisher.address || "No contact information available."}
                  </p>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <BookOpen className="mr-2" size={16} />
                      View Books
                    </Button>
                    
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil size={16} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No publishers found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Publishers;

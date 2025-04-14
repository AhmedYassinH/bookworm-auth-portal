
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { authorService } from "@/services/authorService";
import { AuthorResponseDTO } from "@/types/author";
import { QueryParams } from "@/types/base";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Search, Plus, Pencil, Trash, BookOpen } from "lucide-react";

const Authors = () => {
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
  
  // Fetch authors
  const { data: authors, isLoading, error, refetch } = useQuery({
    queryKey: ['authors', queryParams],
    queryFn: () => authorService.getAuthors(queryParams),
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="mr-2" />
              Authors
            </h1>
            <p className="text-muted-foreground">
              Browse and manage authors in the library system.
            </p>
          </div>
          
          {isAdmin && (
            <Button>
              <Plus className="mr-2" size={16} />
              Add New Author
            </Button>
          )}
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search authors..."
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
            <p className="text-destructive">Error loading authors. Please try again later.</p>
          </div>
        ) : authors && authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors.map((author) => (
              <Card key={author.id}>
                <CardHeader>
                  <CardTitle>{author.name}</CardTitle>
                  <CardDescription>
                    Added on {new Date(author.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {author.bio || "No bio available."}
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
            <p className="text-muted-foreground">No authors found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Authors;

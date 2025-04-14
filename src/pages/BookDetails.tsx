
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { bookService } from "@/services/bookService";
import { borrowingService } from "@/services/borrowingService";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  BookOpen, 
  Calendar, 
  Copy, 
  Users, 
  Building, 
  ArrowLeft
} from "lucide-react";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getBook(Number(id)),
    enabled: !!id,
  });
  
  const handleBorrow = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to borrow books",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      const response = await borrowingService.initiateBorrowing({
        bookIds: [Number(id)],
      });
      
      if (response.success && response.success.length > 0) {
        toast({
          title: "Success",
          description: "Book borrowing request initiated",
        });
      } else if (response.errors && response.errors.length > 0) {
        toast({
          title: "Error",
          description: response.errors[0].message || "Failed to borrow book",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate borrowing",
        variant: "destructive",
      });
    }
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  const isAvailable = book?.numberOfAvailableCopies && book.numberOfAvailableCopies > 0;
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Button variant="ghost" className="mb-6" onClick={goBack}>
          <ArrowLeft className="mr-2" size={16} />
          Back to Books
        </Button>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-destructive">Error loading book details. Please try again later.</p>
          </div>
        ) : book ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card className="overflow-hidden sticky top-20">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  {book.imageURL ? (
                    <img 
                      src={book.imageURL} 
                      alt={book.title} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                      <Book size={64} />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={isAvailable ? "default" : "destructive"}>
                          {isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                        {book.credit > 0 && (
                          <Badge variant="outline">
                            {book.credit} Credits
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Copy size={16} className="text-muted-foreground" />
                      <span>{book.numberOfAvailableCopies} / {book.numberOfTotalCopies} copies available</span>
                    </div>
                    
                    {isAuthenticated && isAvailable && (
                      <Button onClick={handleBorrow} disabled={!isAvailable}>
                        Borrow Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{book.bookGenre}</Badge>
                  <span className="text-muted-foreground text-sm">
                    Added {new Date(book.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mt-2">{book.title}</h1>
                
                {book.authors && book.authors.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Users size={16} />
                    <span>By {book.authors.map(author => author.name).join(", ")}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground">
                  {book.description || "No description available."}
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {book.authors && book.authors.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Users size={18} />
                      Authors
                    </h2>
                    <ul className="space-y-2">
                      {book.authors.map(author => (
                        <li key={author.id} className="p-3 bg-muted rounded-lg">
                          <p className="font-medium">{author.name}</p>
                          {author.bio && (
                            <p className="text-sm text-muted-foreground mt-1">{author.bio}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {book.publishers && book.publishers.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Building size={18} />
                      Publishers
                    </h2>
                    <ul className="space-y-2">
                      {book.publishers.map(publisher => (
                        <li key={publisher.id} className="p-3 bg-muted rounded-lg">
                          <p className="font-medium">{publisher.name}</p>
                          {publisher.contactInfo && (
                            <p className="text-sm text-muted-foreground mt-1">{publisher.contactInfo}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-destructive">Book not found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookDetails;

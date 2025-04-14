
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { bookService } from "@/services/bookService";
import { borrowingService } from "@/services/borrowingService";
import { BookResponseDTO, Genre } from "@/types/book";
import { QueryParams } from "@/types/base";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

const Books = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("title");
  const [isAscending, setIsAscending] = useState(true);
  
  // Query params for the API
  const queryParams: QueryParams = {
    pageSize: 100 // We'll improve this with pagination later
  };
  
  // Add filters if we have them
  if (searchTerm) {
    queryParams.filterOn = "title";
    queryParams.filterQuery = searchTerm;
  }
  
  if (selectedGenre) {
    queryParams.filterOn = "bookGenre";
    queryParams.filterQuery = selectedGenre;
  }
  
  if (sortBy) {
    queryParams.sortBy = sortBy;
    queryParams.isAscending = isAscending;
  }
  
  // Fetch books
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books', queryParams],
    queryFn: () => bookService.getBooks(queryParams),
  });
  
  const handleBorrow = async (bookId: number) => {
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
        bookIds: [bookId],
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
  
  const toggleSortDirection = () => {
    setIsAscending(!isAscending);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Library Books</h1>
          <p className="text-muted-foreground">
            Browse through our collection of books and borrow what interests you.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="min-w-[180px]">
                <Filter className="mr-2" size={16} />
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Genres</SelectItem>
                {Object.values(Genre).map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="createdAt">Date Added</SelectItem>
                <SelectItem value="bookGenre">Genre</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={toggleSortDirection}>
              {isAscending ? <SortAsc size={18} /> : <SortDesc size={18} />}
            </Button>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-destructive">Error loading books. Please try again later.</p>
          </div>
        ) : (
          <BookGrid books={books || []} onBorrow={handleBorrow} />
        )}
      </div>
    </Layout>
  );
};

export default Books;

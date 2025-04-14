
import { BookResponseDTO } from "@/types/book";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface BookCardProps {
  book: BookResponseDTO;
  onBorrow?: (bookId: number) => void;
}

const BookCard = ({ book, onBorrow }: BookCardProps) => {
  const { isAuthenticated } = useAuth();
  
  const isAvailable = book.numberOfAvailableCopies > 0;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
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
        <div className="absolute top-2 right-2">
          <Badge variant={isAvailable ? "default" : "destructive"}>
            {isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
        <CardDescription className="flex items-center text-sm gap-1">
          <BookOpen size={14} />
          <span>{book.bookGenre}</span>
          {book.credit > 0 && (
            <Badge variant="outline" className="ml-auto">
              {book.credit} Credits
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        {book.description && (
          <p className="text-sm line-clamp-3 text-muted-foreground">
            {book.description}
          </p>
        )}
        
        {book.authors && book.authors.length > 0 && (
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Users size={14} />
            <span>
              {book.authors.map(author => author.name).join(", ")}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2 flex">
        <Button asChild variant="secondary" className="flex-1">
          <Link to={`/books/${book.id}`}>Details</Link>
        </Button>
        
        {isAuthenticated && isAvailable && (
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => onBorrow && onBorrow(book.id)}
            disabled={!isAvailable}
          >
            Borrow
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;

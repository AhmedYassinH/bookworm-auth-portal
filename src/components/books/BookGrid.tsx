
import { BookResponseDTO } from "@/types/book";
import BookCard from "./BookCard";

interface BookGridProps {
  books: BookResponseDTO[] | undefined;
  onBorrow?: (bookId: number) => void;
}

const BookGrid = ({ books, onBorrow }: BookGridProps) => {
  // Early return if books is undefined, null, or not an array
  if (!books || !Array.isArray(books) || books.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">No books found</p>
      </div>
    );
  }

  // Filter out any invalid or duplicate books by ID
  const uniqueBooks = books.reduce((acc: BookResponseDTO[], book) => {
    // Only add the book if it's valid and not already in the array
    if (book && book.id && !acc.some(b => b.id === book.id)) {
      acc.push(book);
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {uniqueBooks.map(book => (
        <BookCard key={book.id} book={book} onBorrow={onBorrow} />
      ))}
    </div>
  );
};

export default BookGrid;

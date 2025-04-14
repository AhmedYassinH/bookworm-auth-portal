
import { bookService } from "./bookService";
import { authorService } from "./authorService";
import { publisherService } from "./publisherService";
import { Genre } from "@/types/book";
import { toast } from "@/hooks/use-toast";

// Mock data for initialization
const mockAuthors = [
  { name: "J.K. Rowling", bio: "British author best known for the Harry Potter series" },
  { name: "George Orwell", bio: "English novelist and essayist" },
  { name: "Jane Austen", bio: "English novelist known for her six major novels" },
  { name: "Stephen King", bio: "American author of horror, supernatural fiction, suspense, and fantasy novels" },
  { name: "Agatha Christie", bio: "English writer known for her detective novels" }
];

const mockPublishers = [
  { name: "Penguin Random House", contactInfo: "contact@penguinrandomhouse.com" },
  { name: "HarperCollins", contactInfo: "info@harpercollins.com" },
  { name: "Simon & Schuster", contactInfo: "customerservice@simonandschuster.com" },
  { name: "Macmillan Publishers", contactInfo: "info@macmillan.com" },
  { name: "Hachette Book Group", contactInfo: "contact@hachettebookgroup.com" }
];

const mockBooks = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    description: "The first novel in the Harry Potter series and Rowling's debut novel.",
    bookGenre: Genre.Fantasy,
    credit: 2,
    numberOfTotalCopies: 10,
    numberOfAvailableCopies: 7
  },
  {
    title: "1984",
    description: "A dystopian novel published in 1949 by English author George Orwell.",
    bookGenre: Genre.ScienceFiction,
    credit: 3,
    numberOfTotalCopies: 8,
    numberOfAvailableCopies: 4
  },
  {
    title: "Pride and Prejudice",
    description: "A romantic novel of manners written by Jane Austen in 1813.",
    bookGenre: Genre.Romance,
    credit: 2,
    numberOfTotalCopies: 6,
    numberOfAvailableCopies: 3
  },
  {
    title: "The Shining",
    description: "A horror novel by American author Stephen King, published in 1977.",
    bookGenre: Genre.Horror,
    credit: 4,
    numberOfTotalCopies: 5,
    numberOfAvailableCopies: 2
  },
  {
    title: "Murder on the Orient Express",
    description: "A detective novel by Agatha Christie featuring the Belgian detective Hercule Poirot.",
    bookGenre: Genre.Mystery,
    credit: 3,
    numberOfTotalCopies: 7,
    numberOfAvailableCopies: 5
  },
  {
    title: "To Kill a Mockingbird",
    description: "A novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize.",
    bookGenre: Genre.Fiction,
    credit: 3,
    numberOfTotalCopies: 9,
    numberOfAvailableCopies: 6
  },
  {
    title: "The Great Gatsby",
    description: "A 1925 novel by American writer F. Scott Fitzgerald.",
    bookGenre: Genre.Fiction,
    credit: 2,
    numberOfTotalCopies: 6,
    numberOfAvailableCopies: 4
  },
  {
    title: "The Hobbit",
    description: "A children's fantasy novel by English author J. R. R. Tolkien.",
    bookGenre: Genre.Fantasy,
    credit: 3,
    numberOfTotalCopies: 8,
    numberOfAvailableCopies: 5
  }
];

export const dummyDataService = {
  initializeData: async () => {
    try {
      // Add authors
      const createdAuthors = await Promise.all(
        mockAuthors.map(author => authorService.createAuthor(author))
      );
      console.log("Created authors:", createdAuthors);

      // Add publishers
      const createdPublishers = await Promise.all(
        mockPublishers.map(publisher => publisherService.createPublisher(publisher))
      );
      console.log("Created publishers:", createdPublishers);

      // Add books
      const createdBooks = await Promise.all(
        mockBooks.map(book => bookService.createBook(book))
      );
      console.log("Created books:", createdBooks);

      toast({
        title: "Dummy data initialized",
        description: `Created ${createdAuthors.length} authors, ${createdPublishers.length} publishers, and ${createdBooks.length} books.`,
      });

      return {
        authors: createdAuthors,
        publishers: createdPublishers,
        books: createdBooks
      };
    } catch (error) {
      console.error("Failed to initialize dummy data:", error);
      toast({
        title: "Failed to initialize dummy data",
        description: "Please check the console for more details.",
        variant: "destructive",
      });
      throw error;
    }
  }
};

export default dummyDataService;

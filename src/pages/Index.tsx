import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { bookService } from "@/services/bookService";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Book, BookOpen, Library } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  // Fetch recent books
  const { data: recentBooks, isLoading } = useQuery({
    queryKey: ['recentBooks'],
    queryFn: () => bookService.getBooks({
      sortBy: 'createdAt',
      isAscending: false,
      pageSize: 5
    }),
  });

  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome to the Library Management System
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover, borrow, and manage your favorite books all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/books">
                  Browse Books
                  <BookOpen className="ml-2" size={18} />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">
                    Create an Account
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-muted/50">
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Library size={400} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need for Library Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Books</h3>
              <p className="text-muted-foreground mb-4">
                Explore our extensive collection of books across various genres.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/books" className="flex items-center">
                  Browse Now <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Book className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Borrow Books</h3>
              <p className="text-muted-foreground mb-4">
                Easily borrow books and manage your current borrowings online.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/borrowings" className="flex items-center">
                  View Borrowings <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Library className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Library Management</h3>
              <p className="text-muted-foreground mb-4">
                Administrators can efficiently manage books, authors, and publishers.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/dashboard" className="flex items-center">
                  Go to Dashboard <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Books Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recently Added Books</h2>
            <Button asChild variant="outline">
              <Link to="/books">
                View All Books
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <Separator className="mb-8" />
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <BookGrid books={recentBooks || []} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;

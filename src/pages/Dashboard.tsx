
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { bookService } from "@/services/bookService";
import { authorService } from "@/services/authorService";
import { publisherService } from "@/services/publisherService";
import { borrowingService } from "@/services/borrowingService";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Users,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
  RotateCcw,
  BarChart4
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.userRole === "Admin";
  
  // Fetch data for dashboard
  const { data: books } = useQuery({
    queryKey: ['dashboardBooks'],
    queryFn: () => bookService.getBooks({ pageSize: 5, sortBy: 'createdAt', isAscending: false }),
  });
  
  const { data: authors } = useQuery({
    queryKey: ['dashboardAuthors'],
    queryFn: () => authorService.getAuthors({ pageSize: 5 }),
  });
  
  const { data: publishers } = useQuery({
    queryKey: ['dashboardPublishers'],
    queryFn: () => publisherService.getPublishers({ pageSize: 5 }),
  });
  
  const { data: recentBorrowings } = useQuery({
    queryKey: ['dashboardBorrowings'],
    queryFn: () => borrowingService.getBorrowings({ 
      pageSize: 10, 
      sortBy: 'createdAt', 
      isAscending: false 
    }),
  });
  
  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You need administrator privileges to access this page.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Calculate some basic stats for the dashboard
  const totalBooks = books?.length || 0;
  const totalAuthors = authors?.length || 0;
  const totalPublishers = publishers?.length || 0;
  const totalBorrowings = recentBorrowings?.length || 0;
  
  const pendingBorrowings = recentBorrowings?.filter(b => b.status === "Pending").length || 0;
  const activeBorrowings = recentBorrowings?.filter(b => b.status === "Borrowed").length || 0;
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Manage books, authors, publishers, and borrowings.
        </p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="text-muted-foreground" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBooks}</div>
              <p className="text-xs text-muted-foreground">
                Manage your book collection
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Authors</CardTitle>
              <Users className="text-muted-foreground" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAuthors}</div>
              <p className="text-xs text-muted-foreground">
                Browse and manage authors
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Publishers</CardTitle>
              <Building className="text-muted-foreground" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPublishers}</div>
              <p className="text-xs text-muted-foreground">
                Browse and manage publishers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Borrowings</CardTitle>
              <BarChart4 className="text-muted-foreground" size={18} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBorrowings}</div>
              <p className="text-xs text-muted-foreground">
                Track all book borrowings
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button asChild className="h-24">
            <Link to="/books" className="flex flex-col items-center justify-center gap-2">
              <PlusCircle size={24} />
              <span>Add New Book</span>
            </Link>
          </Button>
          
          <Button asChild className="h-24" variant="secondary">
            <Link to="/authors" className="flex flex-col items-center justify-center gap-2">
              <PlusCircle size={24} />
              <span>Add New Author</span>
            </Link>
          </Button>
          
          <Button asChild className="h-24" variant="outline">
            <Link to="/publishers" className="flex flex-col items-center justify-center gap-2">
              <PlusCircle size={24} />
              <span>Add New Publisher</span>
            </Link>
          </Button>
        </div>
        
        {/* Borrowing Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Borrowing Status Overview</CardTitle>
            <CardDescription>Quick summary of current borrowing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Clock className="text-yellow-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">Pending Requests</p>
                  <p className="text-2xl font-bold">{pendingBorrowings}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">Active Borrowings</p>
                  <p className="text-2xl font-bold">{activeBorrowings}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <RotateCcw className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">Returns Today</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity Tabs */}
        <Tabs defaultValue="books">
          <TabsList className="mb-4">
            <TabsTrigger value="books">Recent Books</TabsTrigger>
            <TabsTrigger value="borrowings">Recent Borrowings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books">
            <Card>
              <CardHeader>
                <CardTitle>Recently Added Books</CardTitle>
                <CardDescription>The latest additions to your library</CardDescription>
              </CardHeader>
              <CardContent>
                {books && books.length > 0 ? (
                  <div className="space-y-4">
                    {books.map(book => (
                      <div key={book.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-3">
                          <BookOpen size={18} />
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Added on {new Date(book.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/books/${book.id}`}>View</Link>
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex justify-end pt-2">
                      <Button asChild variant="link">
                        <Link to="/books">View All Books</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No books found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="borrowings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Borrowing Activity</CardTitle>
                <CardDescription>The latest borrowing requests and updates</CardDescription>
              </CardHeader>
              <CardContent>
                {recentBorrowings && recentBorrowings.length > 0 ? (
                  <div className="space-y-4">
                    {recentBorrowings.slice(0, 5).map(borrowing => (
                      <div key={borrowing.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-3">
                          {borrowing.status === "Pending" && <Clock size={18} />}
                          {borrowing.status === "Approved" && <CheckCircle size={18} />}
                          {borrowing.status === "Rejected" && <XCircle size={18} />}
                          {borrowing.status === "Borrowed" && <BookOpen size={18} />}
                          {borrowing.status === "Returned" && <RotateCcw size={18} />}
                          
                          <div>
                            <p className="font-medium">{borrowing.bookNavigation.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {borrowing.userNavigation.name} • {borrowing.status}
                            </p>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to="/borrowings">Manage</Link>
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex justify-end pt-2">
                      <Button asChild variant="link">
                        <Link to="/borrowings">View All Borrowings</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No borrowing activities found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;

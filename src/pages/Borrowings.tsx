
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { borrowingService } from "@/services/borrowingService";
import { BorrowingAction, BorrowingResponseDTO, BorrowingStatus } from "@/types/borrowing";
import { QueryParams } from "@/types/base";
import { useAuth } from "@/contexts/AuthContext";

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RotateCcw,
  Calendar 
} from "lucide-react";

// Helper function to get badge variant based on status
const getBadgeVariant = (status: BorrowingStatus) => {
  switch (status) {
    case BorrowingStatus.Pending:
      return "outline";
    case BorrowingStatus.Approved:
      return "default";
    case BorrowingStatus.Borrowed:
      return "secondary";
    case BorrowingStatus.Cancelled:
    case BorrowingStatus.Rejected:
      return "destructive";
    case BorrowingStatus.Returned:
      return "success";
    default:
      return "outline";
  }
};

// Helper function to get icon based on status
const getStatusIcon = (status: BorrowingStatus) => {
  switch (status) {
    case BorrowingStatus.Pending:
      return <Clock size={16} />;
    case BorrowingStatus.Approved:
      return <CheckCircle size={16} />;
    case BorrowingStatus.Borrowed:
      return <BookOpen size={16} />;
    case BorrowingStatus.Cancelled:
    case BorrowingStatus.Rejected:
      return <XCircle size={16} />;
    case BorrowingStatus.Returned:
      return <RotateCcw size={16} />;
    default:
      return <AlertCircle size={16} />;
  }
};

const Borrowings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.userRole === "Admin";
  
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  // Query params for the API
  const queryParams: QueryParams = {
    pageSize: 100, // We'll improve this with pagination later
    sortBy: "createdAt",
    isAscending: false
  };
  
  // Add filters if we have them
  if (statusFilter) {
    queryParams.filterOn = "status";
    queryParams.filterQuery = statusFilter;
  }
  
  // Fetch borrowings
  const { data: borrowings, isLoading, error, refetch } = useQuery({
    queryKey: ['borrowings', queryParams],
    queryFn: () => borrowingService.getBorrowings(queryParams),
  });
  
  const handleUpdateStatus = async (action: BorrowingAction, borrowingId: number) => {
    try {
      const response = await borrowingService.updateBorrowingStatus({
        action,
        borrowingIds: [borrowingId]
      });
      
      if (response.success && response.success.length > 0) {
        toast({
          title: "Success",
          description: `Borrowing status updated successfully.`,
        });
        refetch();
      } else if (response.errors && response.errors.length > 0) {
        toast({
          title: "Error",
          description: response.errors[0].message || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update borrowing status",
        variant: "destructive",
      });
    }
  };
  
  // Function to determine available actions based on borrowing status and user role
  const getAvailableActions = (borrowing: BorrowingResponseDTO) => {
    const actions = [];
    
    // Common actions for both users and admins
    if (borrowing.status === BorrowingStatus.Pending) {
      actions.push({
        label: "Cancel",
        action: BorrowingAction.Cancel,
        variant: "outline" as const
      });
    }
    
    // User-specific actions
    if (!isAdmin) {
      if (borrowing.status === BorrowingStatus.Approved) {
        actions.push({
          label: "Confirm Receipt",
          action: BorrowingAction.Confirm,
          variant: "default" as const
        });
      }
    }
    
    // Admin-specific actions
    if (isAdmin) {
      if (borrowing.status === BorrowingStatus.Pending) {
        actions.push({
          label: "Approve",
          action: BorrowingAction.Approve,
          variant: "default" as const
        });
        actions.push({
          label: "Reject",
          action: BorrowingAction.Reject,
          variant: "destructive" as const
        });
      }
      
      if (borrowing.status === BorrowingStatus.Approved) {
        actions.push({
          label: "Reject",
          action: BorrowingAction.Reject,
          variant: "destructive" as const
        });
      }
      
      if (borrowing.status === BorrowingStatus.Borrowed) {
        actions.push({
          label: "Mark as Returned",
          action: BorrowingAction.Return,
          variant: "default" as const
        });
      }
    }
    
    return actions;
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Borrowings</h1>
          <p className="text-muted-foreground">
            Manage your book borrowing requests and history.
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {Object.values(BorrowingStatus).map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
        
        <Separator className="mb-6" />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-destructive">Error loading borrowings. Please try again later.</p>
          </div>
        ) : borrowings && borrowings.length > 0 ? (
          <div className="space-y-4">
            {borrowings.map((borrowing) => (
              <Card key={borrowing.id}>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <CardTitle className="text-lg">
                      {borrowing.bookNavigation.title}
                    </CardTitle>
                    <Badge variant={getBadgeVariant(borrowing.status)} className="flex items-center gap-1">
                      {getStatusIcon(borrowing.status)}
                      {borrowing.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Requested On</p>
                      <p className="text-muted-foreground">
                        {new Date(borrowing.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Checkout Date</p>
                      <p className="text-muted-foreground">
                        {new Date(borrowing.dateOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(borrowing.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {getAvailableActions(borrowing).map((actionItem) => (
                      <Button 
                        key={actionItem.action} 
                        variant={actionItem.variant}
                        onClick={() => handleUpdateStatus(actionItem.action, borrowing.id)}
                      >
                        {actionItem.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No borrowings found.</p>
            <Button asChild className="mt-4">
              <a href="/books">Browse Books</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Borrowings;

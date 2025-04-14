
import { BaseDTO } from "./base";
import { BookResponseDTO } from "./book";
import { MinimalUserResponseDTO } from "./user";

export enum BorrowingStatus {
  Pending = "Pending",
  Cancelled = "Cancelled",
  Approved = "Approved",
  Rejected = "Rejected",
  Borrowed = "Borrowed",
  Returned = "Returned"
}

export enum BorrowingAction {
  Request = "Request",
  Confirm = "Confirm",
  Cancel = "Cancel",
  Approve = "Approve",
  Reject = "Reject",
  Return = "Return"
}

export interface BorrowingResponseDTO extends BaseDTO {
  status: BorrowingStatus;
  dateOut: string;
  dueDate: string;
  createdAt: string;
  bookNavigation: BookResponseDTO;
  approvedByNavigation?: MinimalUserResponseDTO;
  returnedByNavigation?: MinimalUserResponseDTO;
  rejectedByNavigation?: MinimalUserResponseDTO;
  userNavigation: MinimalUserResponseDTO;
}

export interface PendingBorrowingRequestDTO {
  bookIds?: number[];
}

export interface PendingBorrowingResponseDTO {
  success?: BorrowingResponseDTO[];
  errors?: BorrowBooksErrors[];
}

export interface BorrowBooksErrors {
  bookId: number;
  message?: string;
}

export interface BorrowingStatusUpdateRequestDTO {
  action: BorrowingAction;
  borrowingIds?: number[];
}

export interface BorrowingStatusUpdateResponseDTO {
  success?: BorrowingResponseDTO[];
  errors?: BorrowingRequestsErrors[];
}

export interface BorrowingRequestsErrors {
  borrowingId: number;
  message?: string;
}

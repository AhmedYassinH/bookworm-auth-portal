
import { apiRequest } from "./api";
import { 
  BorrowingResponseDTO, 
  PendingBorrowingRequestDTO,
  PendingBorrowingResponseDTO,
  BorrowingStatusUpdateRequestDTO,
  BorrowingStatusUpdateResponseDTO
} from "../types/borrowing";
import { BaseDTO, QueryParams } from "../types/base";

const BORROWING_ENDPOINTS = {
  BASE: "/Borrowing",
  BY_ID: (id: number) => `/Borrowing/${id}`,
  INITIATE: "/Borrowing/initiate",
  ACT_ON_STATUS: "/Borrowing/act-on-borrowing-status",
};

export const borrowingService = {
  getBorrowings: async (params?: QueryParams): Promise<BorrowingResponseDTO[]> => {
    return apiRequest<BorrowingResponseDTO[]>({
      method: "GET",
      url: BORROWING_ENDPOINTS.BASE,
      params,
    });
  },

  getBorrowing: async (id: number): Promise<BorrowingResponseDTO> => {
    return apiRequest<BorrowingResponseDTO>({
      method: "GET",
      url: BORROWING_ENDPOINTS.BY_ID(id),
    });
  },

  initiateBorrowing: async (data: PendingBorrowingRequestDTO): Promise<PendingBorrowingResponseDTO> => {
    return apiRequest<PendingBorrowingResponseDTO>({
      method: "POST",
      url: BORROWING_ENDPOINTS.INITIATE,
      data,
    });
  },

  updateBorrowingStatus: async (data: BorrowingStatusUpdateRequestDTO): Promise<BorrowingStatusUpdateResponseDTO> => {
    return apiRequest<BorrowingStatusUpdateResponseDTO>({
      method: "PUT",
      url: BORROWING_ENDPOINTS.ACT_ON_STATUS,
      data,
    });
  },

  deleteBorrowing: async (id: number, baseData: BaseDTO): Promise<void> => {
    return apiRequest<void>({
      method: "DELETE",
      url: BORROWING_ENDPOINTS.BY_ID(id),
      data: baseData,
    });
  },
};

export default borrowingService;

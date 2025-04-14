
import { apiRequest } from "./api";
import { BookCreateRequestDTO, BookResponseDTO, BookUpdateRequestDTO } from "../types/book";
import { BaseDTO, QueryParams } from "../types/base";

const BOOK_ENDPOINTS = {
  BASE: "/Book",
  BY_ID: (id: number) => `/Book/${id}`,
};

export const bookService = {
  getBooks: async (params?: QueryParams): Promise<BookResponseDTO[]> => {
    return apiRequest<BookResponseDTO[]>({
      method: "GET",
      url: BOOK_ENDPOINTS.BASE,
      params,
    });
  },

  getBook: async (id: number): Promise<BookResponseDTO> => {
    return apiRequest<BookResponseDTO>({
      method: "GET",
      url: BOOK_ENDPOINTS.BY_ID(id),
    });
  },

  createBook: async (data: BookCreateRequestDTO): Promise<BookResponseDTO> => {
    // For file uploads, we need to use FormData
    const formData = new FormData();
    
    // Add text fields
    formData.append("Title", data.title);
    if (data.description) formData.append("Description", data.description);
    if (data.bookGenre) formData.append("BookGenre", data.bookGenre.toString());
    if (data.credit !== undefined) formData.append("Credit", data.credit.toString());
    formData.append("NumberOfTotalCopies", data.numberOfTotalCopies.toString());
    formData.append("NumberOfAvailableCopies", data.numberOfAvailableCopies.toString());
    
    // Add image if it exists
    if (data.image) formData.append("Image", data.image);

    return apiRequest<BookResponseDTO>({
      method: "POST",
      url: BOOK_ENDPOINTS.BASE,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateBook: async (id: number, data: BookUpdateRequestDTO): Promise<BookResponseDTO> => {
    return apiRequest<BookResponseDTO>({
      method: "PUT",
      url: BOOK_ENDPOINTS.BY_ID(id),
      data,
    });
  },

  deleteBook: async (id: number, baseData: BaseDTO): Promise<void> => {
    return apiRequest<void>({
      method: "DELETE",
      url: BOOK_ENDPOINTS.BY_ID(id),
      data: baseData,
    });
  },
};

export default bookService;

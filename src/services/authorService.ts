
import { apiRequest } from "./api";
import { AuthorCreateRequestDTO, AuthorResponseDTO, AuthorUpdateRequestDTO } from "../types/author";
import { BaseDTO, QueryParams } from "../types/base";

const AUTHOR_ENDPOINTS = {
  BASE: "/Author",
  BY_ID: (id: number) => `/Author/${id}`,
};

export const authorService = {
  getAuthors: async (params?: QueryParams): Promise<AuthorResponseDTO[]> => {
    return apiRequest<AuthorResponseDTO[]>({
      method: "GET",
      url: AUTHOR_ENDPOINTS.BASE,
      params,
    });
  },

  getAuthor: async (id: number): Promise<AuthorResponseDTO> => {
    return apiRequest<AuthorResponseDTO>({
      method: "GET",
      url: AUTHOR_ENDPOINTS.BY_ID(id),
    });
  },

  createAuthor: async (data: AuthorCreateRequestDTO): Promise<AuthorResponseDTO> => {
    return apiRequest<AuthorResponseDTO>({
      method: "POST",
      url: AUTHOR_ENDPOINTS.BASE,
      data,
    });
  },

  updateAuthor: async (id: number, data: AuthorUpdateRequestDTO): Promise<AuthorResponseDTO> => {
    return apiRequest<AuthorResponseDTO>({
      method: "PUT",
      url: AUTHOR_ENDPOINTS.BY_ID(id),
      data,
    });
  },

  deleteAuthor: async (id: number, baseData: BaseDTO): Promise<void> => {
    return apiRequest<void>({
      method: "DELETE",
      url: AUTHOR_ENDPOINTS.BY_ID(id),
      data: baseData,
    });
  },
};

export default authorService;

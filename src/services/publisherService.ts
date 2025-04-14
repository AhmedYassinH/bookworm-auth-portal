
import { apiRequest } from "./api";
import { PublisherCreateRequestDTO, PublisherResponseDTO, PublisherUpdateRequestDTO } from "../types/publisher";
import { BaseDTO, QueryParams } from "../types/base";

const PUBLISHER_ENDPOINTS = {
  BASE: "/Publisher",
  BY_ID: (id: number) => `/Publisher/${id}`,
};

export const publisherService = {
  getPublishers: async (params?: QueryParams): Promise<PublisherResponseDTO[]> => {
    return apiRequest<PublisherResponseDTO[]>({
      method: "GET",
      url: PUBLISHER_ENDPOINTS.BASE,
      params,
    });
  },

  getPublisher: async (id: number): Promise<PublisherResponseDTO> => {
    return apiRequest<PublisherResponseDTO>({
      method: "GET",
      url: PUBLISHER_ENDPOINTS.BY_ID(id),
    });
  },

  createPublisher: async (data: PublisherCreateRequestDTO): Promise<PublisherResponseDTO> => {
    return apiRequest<PublisherResponseDTO>({
      method: "POST",
      url: PUBLISHER_ENDPOINTS.BASE,
      data,
    });
  },

  updatePublisher: async (id: number, data: PublisherUpdateRequestDTO): Promise<PublisherResponseDTO> => {
    return apiRequest<PublisherResponseDTO>({
      method: "PUT",
      url: PUBLISHER_ENDPOINTS.BY_ID(id),
      data,
    });
  },

  deletePublisher: async (id: number, baseData: BaseDTO): Promise<void> => {
    return apiRequest<void>({
      method: "DELETE",
      url: PUBLISHER_ENDPOINTS.BY_ID(id),
      data: baseData,
    });
  },
};

export default publisherService;

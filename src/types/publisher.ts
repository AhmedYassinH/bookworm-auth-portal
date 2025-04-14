
import { BaseDTO } from "./base";

export interface PublisherResponseDTO extends BaseDTO {
  name?: string;
  email?: string;
  address?: string;
  createdAt: string;
}

export interface PublisherCreateRequestDTO {
  name: string;
  email?: string;
  address?: string;
}

export interface PublisherUpdateRequestDTO extends BaseDTO {
  name?: string;
  email?: string;
  address?: string;
}

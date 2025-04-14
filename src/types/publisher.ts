
import { BaseDTO } from "./base";

export interface PublisherResponseDTO extends BaseDTO {
  name?: string;
  contactInfo?: string;
  createdAt: string;
}

export interface PublisherCreateRequestDTO {
  name: string;
  contactInfo?: string;
}

export interface PublisherUpdateRequestDTO extends BaseDTO {
  name?: string;
  contactInfo?: string;
}


import { BaseDTO } from "./base";

export interface AuthorResponseDTO extends BaseDTO {
  name?: string;
  bio?: string;
  createdAt: string;
}

export interface AuthorCreateRequestDTO {
  name: string;
  bio?: string;
}

export interface AuthorUpdateRequestDTO extends BaseDTO {
  name?: string;
  bio?: string;
}


import { Role, Sex } from "./auth";

export interface MinimalUserResponseDTO {
  id: number;
  name?: string;
  imageURL?: string;
  userRole: Role;
}

export interface UserResponseDTO {
  id: number;
  timeStamp?: string;
  name?: string;
  bio?: string;
  birthDate?: string;
  imageURL?: string;
  address?: string;
  userSex: Sex;
  credit?: number;
  email?: string;
  phone?: string;
  userRole: Role;
  createdAt: string;
}

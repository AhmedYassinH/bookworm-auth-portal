
export enum Role {
  Admin = "Admin",
  User = "User"
}

export enum Sex {
  Male = "Male",
  Female = "Female"
}

export interface AuthResponseDTO {
  userId: number;
  userName: string | null;
  userRole: Role;
  imageUrl: string | null;
  accessToken: string | null;
}

export interface RegisterUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserRequestDTO {
  email: string;
  password: string;
}

export interface UpdatePasswordRequestDTO {
  oldPassword: string | null;
  newPassword: string | null;
}

export interface UserResponseDTO {
  id: number;
  timeStamp: string | null;
  name: string | null;
  bio: string | null;
  birthDate: string | null;
  imageURL: string | null;
  address: string | null;
  userSex: Sex;
  credit: number | null;
  email: string | null;
  phone: string | null;
  userRole: Role;
  createdAt: string;
}

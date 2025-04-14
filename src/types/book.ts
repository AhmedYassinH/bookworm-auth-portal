
import { BaseDTO } from "./base";
import { AuthorResponseDTO } from "./author";
import { PublisherResponseDTO } from "./publisher";

export enum Genre {
  Fiction = "Fiction",
  NonFiction = "NonFiction",
  Science = "Science",
  Fantasy = "Fantasy",
  Biography = "Biography",
  History = "History",
  Mystery = "Mystery",
  Romance = "Romance",
  ScienceFiction = "ScienceFiction",
  Thriller = "Thriller",
  Horror = "Horror",
  Poetry = "Poetry",
  Children = "Children",
  Comics = "Comics",
  Art = "Art",
  Cooking = "Cooking",
  Health = "Health",
  Travel = "Travel",
  Religion = "Religion",
  SelfHelp = "SelfHelp"
}

export interface BookResponseDTO extends BaseDTO {
  title: string;
  description?: string;
  bookGenre: Genre;
  credit: number;
  imageURL?: string;
  authors?: AuthorResponseDTO[];
  publishers?: PublisherResponseDTO[];
  numberOfTotalCopies: number;
  numberOfAvailableCopies: number;
  createdAt: string;
}

export interface BookUpdateRequestDTO extends BaseDTO {
  title?: string;
  description?: string;
  bookGenre?: Genre;
  credit?: number;
  authorsIds?: number[];
  publishersIds?: number[];
  numberOfTotalCopies?: number;
  numberOfAvailableCopies?: number;
}

export interface BookCreateRequestDTO {
  title: string;
  description?: string;
  bookGenre?: Genre;
  credit?: number;
  image?: File;
  numberOfTotalCopies: number;
  numberOfAvailableCopies: number;
}

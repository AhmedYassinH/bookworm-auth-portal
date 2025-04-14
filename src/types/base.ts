
export interface BaseDTO {
  id: number;
  timeStamp?: string;
}

export interface QueryParams {
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
  pageSize?: number;
  pageNumber?: number;
}

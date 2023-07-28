export interface ResponseDTO<T> {
  message: string;
  data: T;
}

export interface ListDTO<T> {
  data: T[];
  total: number;
  limit: number;
  start: number;
}

export interface MetaDTO {
  total: number;
  limit: number;
  start: number;
}
export interface ResponseDTO<T> {
  message: string;
  data: T;
  meta?: MetaDTO;
}

import { CommentOrderBy } from "../../domain/comment.entity";

export interface GetCommentsDTO {
  orderBy: CommentOrderBy;
  limit?: number;
  start?: number;
}

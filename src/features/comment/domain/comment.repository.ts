import { DataWithMeta } from "@src/shared/entities/data.entity";
import { CreateCommentDTO } from "../data/dtos/create-comment.dto";
import { CreateReactionDTO } from "../data/dtos/create-reaction.dto";
import { GetCommentsDTO } from "../data/dtos/get-comments.dto";
import { UpdateCommentDTO } from "../data/dtos/update-comment.dto";
import { Comment } from "./comment.entity";

export interface CommentRepository {
  getAll(dto: GetCommentsDTO): Promise<DataWithMeta<Comment[]>>;
  getById(id: string): Promise<Comment>;
  create(dto: CreateCommentDTO): Promise<void>;
  update(dto: UpdateCommentDTO): Promise<void>;
  delete(id: string): Promise<void>;
  addReaction(dto: CreateReactionDTO): Promise<Comment>;
}

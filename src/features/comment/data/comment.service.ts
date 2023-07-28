import { ResponseDTO } from "@src/shared/dtos/response.dto";
import api from "@src/shared/services/api.service";
import { Comment } from "../domain/comment.entity";
import { CommentRepository } from "../domain/comment.repository";
import { commentDTOToEntity } from "./comment.mapper";
import { CommentDTO } from "./dtos/comment.dto";
import { CreateCommentDTO } from "./dtos/create-comment.dto";
import { CreateReactionDTO } from "./dtos/create-reaction.dto";
import { GetCommentsDTO } from "./dtos/get-comments.dto";
import { UpdateCommentDTO } from "./dtos/update-comment.dto";

class CommentService implements CommentRepository {
  async addReaction(dto: CreateReactionDTO): Promise<Comment> {
    const payload = {
      type: dto.type,
    };
    const response = await api.post<ResponseDTO<CommentDTO>>(
      `/comments/${dto.commentId}/react`,
      payload
    );
    return commentDTOToEntity(response.data.data);
  }
  async getAll(request: GetCommentsDTO): Promise<Comment[]> {
    const response = await api.get<ResponseDTO<CommentDTO[]>>("/comments", {
      params: request,
    });
    return response.data?.data?.map((item) => commentDTOToEntity(item));
  }
  async getById(id: string): Promise<Comment> {
    const response = await api.get<ResponseDTO<CommentDTO>>(`/comments/${id}`);
    return commentDTOToEntity(response.data.data);
  }

  async create(dto: CreateCommentDTO): Promise<void> {
    const payload = {
      comment: dto.comment,
    };
    await api.post<void>("/comments", payload);
  }
  async update(dto: UpdateCommentDTO): Promise<void> {
    const payload = {
      comment: dto.comment,
    };
    await api.put<void>(`/comments/${dto.id}`, payload);
  }

  async delete(id: string): Promise<void> {
    await api.delete<void>(`/comments/${id}`);
  }
}

export const commentService = Object.freeze(new CommentService());

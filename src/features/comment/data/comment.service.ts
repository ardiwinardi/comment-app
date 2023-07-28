import { ResponseDTO } from "@src/shared/dtos/response.dto";
import { DataWithMeta } from "@src/shared/entities/data.entity";
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
  async getAll(request: GetCommentsDTO): Promise<DataWithMeta<Comment[]>> {
    const response = await api.get<ResponseDTO<CommentDTO[]>>("/comments", {
      params: request,
    });
    return {
      data: response.data?.data?.map((item) => commentDTOToEntity(item)),
      meta: response.data?.meta ?? { total: 0, limit: 0, start: 0 },
    };
  }
  async getById(id: string): Promise<Comment> {
    const response = await api.get<ResponseDTO<CommentDTO>>(`/comments/${id}`);
    return commentDTOToEntity(response.data.data);
  }

  async create(dto: CreateCommentDTO): Promise<boolean> {
    const payload = {
      comment: dto.comment,
    };
    await api.post<boolean>("/comments", payload);
    return true;
  }
  async update(dto: UpdateCommentDTO): Promise<boolean> {
    const payload = {
      comment: dto.comment,
    };
    await api.put<boolean>(`/comments/${dto.id}`, payload);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await api.delete<boolean>(`/comments/${id}`);
    return true;
  }
}

export const commentService = Object.freeze(new CommentService());

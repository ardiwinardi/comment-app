import { Comment } from "../domain/comment.entity";
import { CommentDTO } from "./dtos/comment.dto";

export const commentDTOToEntity = (item: CommentDTO): Comment => {
  return {
    id: item._id ?? "",
    user: item.user ?? {},
    createdAt: item.createdAt ? new Date(item.createdAt) : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
    comment: item.comment ?? "",
    reactions:
      item.reactions?.map((reaction) => ({
        username: reaction.username ?? "",
        type: reaction.type ?? "",
      })) ?? [],
    totalLiked: item.totalLiked ?? 0,
    totalDisliked: item.totalDisliked ?? 0,
  };
};

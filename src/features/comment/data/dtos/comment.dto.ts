import { ReactionType } from "../../domain/reaction.entity";
import { User } from "../../domain/user.entity";

export interface CommentDTO {
  _id?: string;
  user?: User;
  comment?: string;
  reactions?: { username: string; type: ReactionType }[];
  totalLiked?: number;
  totalDisliked?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

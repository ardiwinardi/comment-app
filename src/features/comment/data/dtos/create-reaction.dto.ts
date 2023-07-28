import { ReactionType } from "../../domain/reaction.entity";

export interface CreateReactionDTO {
  commentId: string;
  type: ReactionType;
}

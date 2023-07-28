import { Reaction } from "./reaction.entity";
import { User } from "./user.entity";

export interface Comment {
  id: string;
  user: Partial<User>;
  comment: string;
  reactions: Reaction[];
  totalLiked: number;
  totalDisliked: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export enum CommentOrderBy {
  MOST_LIKED = "most-liked",
  MOST_DISLIKED = "most-disliked",
  NEWEST = "newest",
}

import { Reaction } from "./reaction.entity";
import { User } from "./user.entity";

export interface Comment {
  user: User;
  comment: string;
  reactions: Reaction[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

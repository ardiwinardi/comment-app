export enum ReactionType {
  LIKE = "like",
  DISLIKE = "dislike",
}
export interface Reaction {
  username: string;
  type: ReactionType;
}

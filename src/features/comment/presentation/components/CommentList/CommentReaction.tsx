import { Comment } from "@src/features/comment/domain/comment.entity";
import { ReactionType } from "@src/features/comment/domain/reaction.entity";
import { User } from "@src/features/comment/domain/user.entity";
import { Button } from "@src/shared/components/forms";
import { Flex } from "@src/shared/components/layouts";
import { useEffect, useMemo } from "react";
import { HiOutlineThumbDown, HiOutlineThumbUp } from "react-icons/hi";
import { toast } from "react-toastify";
import { useAddReactionMutation } from "../../controllers/comment.controller";
import styles from "./CommentReaction.module.scss";

type Props = {
  comment: Comment;
  user: User | null;
};
export default function CommentReaction(props: Props) {
  const [addReaction, { isError, error }] = useAddReactionMutation();

  const isLike = useMemo(() => {
    return (
      props.comment.reactions.filter(
        (reaction) =>
          reaction.username === props.user?.username &&
          reaction.type === ReactionType.LIKE
      ).length > 0
    );
  }, [props.comment.reactions, props.user?.username]);

  const isDislike = useMemo(() => {
    return (
      props.comment.reactions.filter(
        (reaction) =>
          reaction.username === props.user?.username &&
          reaction.type === ReactionType.DISLIKE
      ).length > 0
    );
  }, [props.comment.reactions, props.user?.username]);

  const handleLike = () => {
    // validate no double click
    if (isLike) return false;

    addReaction({
      commentId: props.comment.id,
      type: ReactionType.LIKE,
    });
  };

  const handleDislike = () => {
    // validate no double click
    if (isDislike) return false;

    addReaction({
      commentId: props.comment.id,
      type: ReactionType.DISLIKE,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError]);

  return (
    <Flex
      style={{ justifyContent: "flex-start", width: 170, marginTop: 10 }}
      className={styles.container}
    >
      <Flex style={{ width: 60 }}>
        {props.user && (
          <Button className={styles.reactButton} onClick={handleLike}>
            Like
          </Button>
        )}

        <div style={{ display: "flex" }}>
          <HiOutlineThumbUp color={isLike ? "blue" : ""} />
          <div className={styles.counter}>{props.comment.totalLiked}</div>
        </div>
      </Flex>
      <div style={{ width: 20 }} />
      <Flex style={{ width: 80, borderLeft: "1px #ccc solid" }}>
        {props.user && (
          <Button
            isTextLink
            className={styles.reactButton}
            onClick={handleDislike}
          >
            Dislike
          </Button>
        )}
        <div style={{ display: "flex" }}>
          <HiOutlineThumbDown
            color={isDislike ? "blue" : ""}
            style={{ marginBottom: -2 }}
          />
          <div className={styles.counter}>{props.comment.totalDisliked}</div>
        </div>
      </Flex>
    </Flex>
  );
}

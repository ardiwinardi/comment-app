import { Avatar } from "@src/shared/components/commons";
import { Box, Center, Flex } from "@src/shared/components/layouts";
import { useLazyGetCommentsQuery } from "../controllers/comment.controller";

import { AuthContext } from "@src/features/auth/presentation/contexts/AuthContext";
import { Button } from "@src/shared/components/forms";
import { useAppSelector } from "@src/shared/redux/hooks";
import { shortenName } from "@src/shared/utils/string-format";
import { useContext, useEffect, useState } from "react";
import { Comment } from "../../domain/comment.entity";
import styles from "./CommentList.module.scss";
import CommentMessage from "./CommentList/CommentMessage";
import CommentReaction from "./CommentList/CommentReaction";

export default function CommentList() {
  const { user } = useContext(AuthContext);
  const orderBy = useAppSelector((state) => state.comment.orderBy);
  const [getComments, getCommentsResult] = useLazyGetCommentsQuery();

  const [isLoading, setIsLoading] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const meta = getCommentsResult.data?.meta;

  useEffect(() => {
    getComments({ orderBy });
  }, [orderBy]);

  const handleNextPage = async () => {
    if (meta) {
      setIsLoading(true);
      const start = (meta.start + 1) * meta.limit;
      const response = await getComments({ orderBy, start }).unwrap();
      let commentListTmp: Comment[] = [];
      if (response.data) {
        commentListTmp = [...commentList, ...response.data];
      }
      setCommentList(commentListTmp);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (getCommentsResult.isSuccess) {
      setCommentList(getCommentsResult.data.data);
    }
  }, [getCommentsResult.isSuccess]);

  return (
    <Box className={styles.container}>
      {commentList.map((comment) => (
        <Flex
          key={comment.id}
          style={{ marginBottom: 20, alignItems: "flex-start" }}
        >
          <Avatar
            text={shortenName(comment.user?.name ?? "")}
            style={{ marginRight: 5 }}
          />
          <div style={{ flex: 1 }}>
            <CommentMessage
              comment={comment}
              isEditable={user?.username === comment.user?.username}
            />
            <CommentReaction comment={comment} user={user} />
          </div>
        </Flex>
      ))}
      {meta && meta?.total > commentList.length && (
        <Center>
          <Button
            variant="default"
            onClick={handleNextPage}
            disabled={isLoading}
          >
            Load more
          </Button>
        </Center>
      )}
    </Box>
  );
}

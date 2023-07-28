import { Avatar } from "@src/shared/components/commons";
import { Box, Center, Flex } from "@src/shared/components/layouts";
import { useLazyGetCommentsQuery } from "../controllers/comment.controller";

import { AuthContext } from "@src/features/auth/presentation/contexts/AuthContext";
import { Button } from "@src/shared/components/forms";
import { useAppSelector } from "@src/shared/redux/hooks";
import { shortenName } from "@src/shared/utils/string-format";
import { useContext, useEffect } from "react";
import styles from "./CommentList.module.scss";
import CommentMessage from "./CommentList/CommentMessage";
import CommentReaction from "./CommentList/CommentReaction";

export default function CommentList() {
  const { user } = useContext(AuthContext);
  const orderBy = useAppSelector((state) => state.comment.orderBy);
  const [getComments, getCommentsResult] = useLazyGetCommentsQuery();

  const meta = getCommentsResult.data?.meta;
  const commentList = getCommentsResult.data?.data ?? [];

  useEffect(() => {
    getComments({ orderBy });
  }, [orderBy]);

  const handleLoadMore = () => {
    if (meta) {
      const limit = meta.limit + meta.limit;
      getComments({ orderBy, start: 0, limit });
    }
  };

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
          <Button variant="default" onClick={handleLoadMore}>
            Load more
          </Button>
        </Center>
      )}
    </Box>
  );
}

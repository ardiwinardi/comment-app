import { Avatar } from "@src/shared/components/commons";
import { Button, Textarea } from "@src/shared/components/forms";
import { Box, Flex } from "@src/shared/components/layouts";
import styles from "./CommentForm.module.scss";
export default function CommentForm() {
  return (
    <Box className={styles.container}>
      <Flex
        style={{
          marginBottom: "10px",
        }}
      >
        <Avatar text="AS" style={{ marginRight: 5 }} />
        <Textarea placeholder="Add a comment..." />
      </Flex>
      <Button style={{ marginLeft: 45 }}>Post</Button>
    </Box>
  );
}

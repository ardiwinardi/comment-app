import { Button, TextInput } from "@src/shared/components/forms";
import { Avatar, Box, Flex } from "@src/shared/components/layouts";
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
        <TextInput placeholder="Add a comment..." />
      </Flex>
      <Button style={{ marginLeft: 45 }}>Post</Button>
    </Box>
  );
}

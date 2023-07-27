import { Box, Layout } from "@src/shared/components/layouts";
import CommentForm from "./components/CommentForm";

export default function CommentPage() {
  return (
    <Layout>
      <Box style={{ height: 200, backgroundColor: "#ccc" }} />

      <CommentForm />
    </Layout>
  );
}

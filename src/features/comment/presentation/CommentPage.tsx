import { Box } from "@src/shared/components/layouts";
import Layout from "@src/shared/components/layouts/Layout";
import CommentForm from "./components/CommentForm";

export default function CommentPage() {
  return (
    <Layout>
      <Box style={{ height: 200, backgroundColor: "#ccc" }} />

      <CommentForm />
    </Layout>
  );
}

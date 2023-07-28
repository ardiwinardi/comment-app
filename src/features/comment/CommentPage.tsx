import { Box } from "@src/shared/components/layouts";
import { useContext } from "react";
import { AuthContext } from "../auth/presentation/contexts/AuthContext";
import CommentFilter from "./presentation/components/CommentFilter";
import CommentForm from "./presentation/components/CommentForm";
import CommentList from "./presentation/components/CommentList";

export default function CommentPage() {
  const { user } = useContext(AuthContext);
  return (
    <main
      style={{
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        border: "1px #e3e1e1 solid",
      }}
    >
      <Box
        style={{
          height: 100,
          backgroundColor: "#e3e1e1",
        }}
      />
      <Box
        style={{
          padding: 10,
        }}
      >
        {user && <CommentForm />}

        <CommentFilter />
        <CommentList />
      </Box>
    </main>
  );
}

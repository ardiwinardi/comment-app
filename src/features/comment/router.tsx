import CommentPage from "./CommentPage";
import commentRoutes from "./routes";

const commentRouter = [
  {
    path: commentRoutes.index,
    element: <CommentPage />,
  },
];

export default commentRouter;

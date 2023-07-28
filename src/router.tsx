import { createBrowserRouter } from "react-router-dom";
import authRouter from "./features/auth/presentation/router";
import commentRouter from "./features/comment/router";
import ErrorElement from "./shared/components/ErrorElement";
import Root from "./shared/components/Root";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [...authRouter, ...commentRouter],
  },
]);

export default appRouter;

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import authRoutes from "./routes";

const authRouter = [
  {
    path: authRoutes.login,
    element: <LoginPage />,
  },
  {
    path: authRoutes.register,
    element: <RegisterPage />,
  },
];

export default authRouter;

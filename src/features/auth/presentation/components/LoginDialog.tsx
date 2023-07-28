/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import commentRoutes from "@src/features/comment/routes";
import { Dialog } from "@src/shared/components/commons";
import { Button, TextInput } from "@src/shared/components/forms";
import ErrorMessage from "@src/shared/components/forms/ErrorMessage";
import { Center, Flex } from "@src/shared/components/layouts";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { useLoginMutation } from "../controllers/auth.controller";
import authRoutes from "../routes";

const loginSchema = object().shape({
  username: string().required("Username harus diisi"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password harus diisi"),
});

type LoginFormData = InferType<typeof loginSchema>;

export default function LoginDialog() {
  const { getMe } = useContext(AuthContext);
  const [login, loginResult] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(commentRoutes.index);
  };

  useEffect(() => {
    if (loginResult.isSuccess) {
      getMe();
      handleClose();
      toast.success("Login successfully");
    }
  }, [loginResult.isSuccess]);

  useEffect(() => {
    if (loginResult.isError) {
      toast.error("Invalid credentials");
    }
  }, [loginResult.isError]);

  return (
    <Dialog open={true} handleClose={() => handleClose()}>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
          color: "#CCC",
        }}
      >
        Welcome to Comment System
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput label="Username" value={value} onChange={onChange} />
          )}
        />
        <ErrorMessage message={errors.username?.message} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Password"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />

        <ErrorMessage message={errors.password?.message} />
        <Flex style={{ marginTop: 30 }}>
          <Button
            disabled={loginResult.isLoading}
            type="submit"
            style={{
              margin: "auto",
              width: "100%",
              borderRadius: 20,
              paddingTop: 12,
              paddingBottom: 12,
              fontSize: 16,
            }}
          >
            Sign in
          </Button>
        </Flex>

        <Center style={{ marginTop: 18, fontSize: 15 }}>
          <Link to={authRoutes.register}>
            <Button isTextLink>Register</Button>
          </Link>
        </Center>
      </form>
    </Dialog>
  );
}

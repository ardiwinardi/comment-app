/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import commentRoutes from "@src/features/comment/routes";
import { Dialog } from "@src/shared/components/commons";
import { Button, TextInput } from "@src/shared/components/forms";
import ErrorMessage from "@src/shared/components/forms/ErrorMessage";
import { Center, Flex } from "@src/shared/components/layouts";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";
import { useRegisterMutation } from "../controllers/auth.controller";
import authRoutes from "../routes";

const registerSchema = object().shape({
  name: string().required("Name is required"),
  username: string().required("Name is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type RegisterFormData = InferType<typeof registerSchema>;

export default function RegisterDialog() {
  const [register, result] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(commentRoutes.index);
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleClose();
      toast.success("User registered successfully");
    }
  }, [result.isSuccess]);

  useEffect(() => {
    if (result.isError) {
      toast.error("Register failed");
    }
  }, [result.isError]);

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
        Register to Comment System
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput label="Name" value={value} onChange={onChange} />
          )}
        />
        <ErrorMessage message={errors.name?.message} />

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
            disabled={result.isLoading}
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
            Register
          </Button>
        </Flex>

        <Center style={{ marginTop: 18, fontSize: 15 }}>
          <Link to={authRoutes.login}>
            <Button isTextLink>Login</Button>
          </Link>
        </Center>
      </form>
    </Dialog>
  );
}

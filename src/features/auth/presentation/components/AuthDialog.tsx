import { Dialog } from "@src/shared/components/commons";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function AuthDialog({ open, handleClose }: Props) {
  const [dialogType] = useState<"login" | "register">("login");

  return (
    <Dialog open={open} handleClose={() => handleClose()}>
      {dialogType === "login" ? <LoginForm /> : <RegisterForm />}
    </Dialog>
  );
}

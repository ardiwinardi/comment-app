import { Button, TextInput } from "@src/shared/components/forms";
import { Flex } from "@src/shared/components/layouts";

export default function LoginForm() {
  return (
    <>
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
      <TextInput label="Username" />
      <TextInput label="Password" />
      <Flex style={{ marginTop: 30 }}>
        <Button
          style={{
            margin: "auto",
            width: "80%",
            borderRadius: 20,
            paddingTop: 12,
            paddingBottom: 12,
            fontSize: 16,
          }}
        >
          Sign in
        </Button>
        <div style={{ width: 30 }} />
        <Button
          style={{
            margin: "auto",
            width: "80%",
            borderRadius: 20,
            paddingTop: 12,
            paddingBottom: 12,
            fontSize: 16,
          }}
        >
          Register
        </Button>
      </Flex>
    </>
  );
}
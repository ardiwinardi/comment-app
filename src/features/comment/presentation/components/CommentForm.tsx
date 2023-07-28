import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@src/features/auth/presentation/contexts/AuthContext";
import { Avatar } from "@src/shared/components/commons";
import { Button, Textarea } from "@src/shared/components/forms";
import ErrorMessage from "@src/shared/components/forms/ErrorMessage";
import { Box, Flex } from "@src/shared/components/layouts";
import { shortenName } from "@src/shared/utils/string-format";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";
import { useCreateCommentMutation } from "../controllers/comment.controller";
import styles from "./CommentForm.module.scss";

const commentSchema = object().shape({
  comment: string().required("comment is required"),
});
type CommentFormData = InferType<typeof commentSchema>;

export default function CommentForm() {
  const { user } = useContext(AuthContext);
  const [createComment, result] = useCreateCommentMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = (data: CommentFormData) => {
    createComment(data);
  };

  useEffect(() => {
    if (result.isSuccess) {
      setValue("comment", "");
    }
  }, [result.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.container}>
        <Flex
          style={{
            marginBottom: "10px",
          }}
        >
          <Avatar
            text={shortenName(user?.name ?? "")}
            style={{ marginRight: 5 }}
          />
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value } }) => (
              <Textarea
                placeholder="Add a comment..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
          <ErrorMessage message={errors.comment?.message} />
        </Flex>

        {watch("comment") && (
          <Button
            type="submit"
            disabled={result.isLoading}
            style={{ marginLeft: 45 }}
          >
            Post
          </Button>
        )}
      </Box>
    </form>
  );
}

import { yupResolver } from "@hookform/resolvers/yup";
import { Comment } from "@src/features/comment/domain/comment.entity";
import DropdownMenu from "@src/shared/components/commons/DropdownMenu";
import { Button, Textarea } from "@src/shared/components/forms";
import ErrorMessage from "@src/shared/components/forms/ErrorMessage";
import { Flex } from "@src/shared/components/layouts";
import useDisclosure from "@src/shared/hooks/useDisclosure";
import { convertDateToHumanReadable } from "@src/shared/utils/date-convert";
import { toTitleCase } from "@src/shared/utils/string-format";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiDotsVertical } from "react-icons/hi";
import { InferType, object, string } from "yup";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../controllers/comment.controller";
import styles from "./CommentMessage.module.scss";

const commentSchema = object().shape({
  comment: string().required("comment is required"),
});

type CommentFormData = InferType<typeof commentSchema>;

type Props = {
  isEditable: boolean;
  comment: Comment;
};

export default function CommentMessage(props: Props) {
  const { open: editable, control: editableControl } = useDisclosure();

  const [updateComment, updateCommentResult] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      comment: props.comment.comment,
    },
  });

  const onSubmit = (data: CommentFormData) => {
    updateComment({
      ...data,
      id: props.comment.id,
    });
  };

  useEffect(() => {
    if (updateCommentResult.isSuccess) {
      editableControl.close();
    }
  }, [updateCommentResult.isSuccess]);

  const menus = useMemo(
    () => [
      { label: "Edit", onClick: () => editableControl.open() },
      { label: "Delete", onClick: () => deleteComment(props.comment.id) },
    ],
    []
  );

  return (
    <div className={styles.message}>
      <Flex>
        <h3>{toTitleCase(props.comment.user?.name ?? "")}</h3>

        <div style={{ position: "relative" }}>
          <Flex>
            <time style={{ fontSize: 12 }}>
              {props.comment.updatedAt &&
                convertDateToHumanReadable(props.comment.updatedAt)}
            </time>
            {props.isEditable ? (
              <DropdownMenu menus={menus}>
                <HiDotsVertical />
              </DropdownMenu>
            ) : (
              <div style={{ width: 10 }} />
            )}
          </Flex>
        </div>
      </Flex>

      {editable ? (
        <div style={{ paddingRight: 30, paddingBottom: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="comment"
              render={({ field: { onChange, value } }) => (
                <Textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
            <ErrorMessage message={errors.comment?.message} />

            <Flex style={{ marginTop: 10, width: 150 }}>
              <Button variant="default" type="submit">
                Save
              </Button>
              <Button variant="default" onClick={() => editableControl.close()}>
                Close
              </Button>
            </Flex>
          </form>
        </div>
      ) : (
        <article>
          {props.comment.comment.split("\n").map((str, index) => (
            <p key={index}>{str}</p>
          ))}
          {props.comment.createdAt?.getTime() !==
          props.comment.updatedAt?.getTime() ? (
            <span style={{ color: "#767373" }}>(edited)</span>
          ) : (
            ""
          )}
        </article>
      )}
    </div>
  );
}

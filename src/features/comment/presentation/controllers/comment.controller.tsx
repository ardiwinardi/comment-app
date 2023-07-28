import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { DataWithMeta } from "@src/shared/entities/data.entity";
import { commentService } from "../../data/comment.service";
import { CreateCommentDTO } from "../../data/dtos/create-comment.dto";
import { CreateReactionDTO } from "../../data/dtos/create-reaction.dto";
import { GetCommentsDTO } from "../../data/dtos/get-comments.dto";
import { UpdateCommentDTO } from "../../data/dtos/update-comment.dto";
import { Comment } from "../../domain/comment.entity";

export const commentController = createApi({
  reducerPath: "commentController",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Comments"],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getComments: builder.query<DataWithMeta<Comment[]>, GetCommentsDTO>({
      queryFn: async (request) => ({
        data: await commentService.getAll(request),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(
                ({ id }) => ({ type: "Comments", id } as const)
              ),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),
    getComment: builder.query<Comment, string>({
      queryFn: async (id) => ({
        data: await commentService.getById(id),
      }),
      providesTags: (result, error, id) => [{ type: "Comments", id }],
    }),
    createComment: builder.mutation<boolean, CreateCommentDTO>({
      queryFn: async (request) => ({
        data: await commentService.create(request),
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    updateComment: builder.mutation<boolean, UpdateCommentDTO>({
      queryFn: async (request) => ({
        data: await commentService.update(request),
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Comments", id }],
    }),
    deleteComment: builder.mutation<boolean, string>({
      queryFn: async (id) => ({
        data: await commentService.delete(id),
      }),
      invalidatesTags: (result, error, id) => [{ type: "Comments", id }],
    }),
    addReaction: builder.mutation<Comment, CreateReactionDTO>({
      queryFn: async (request) => ({
        data: await commentService.addReaction(request),
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
});

export const {
  useLazyGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useAddReactionMutation,
  useDeleteCommentMutation,
} = commentController;

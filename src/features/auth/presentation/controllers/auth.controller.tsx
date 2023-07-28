import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest } from "../../data/auth.request";
import { authService } from "../../data/services/auth.service";
import { User } from "../../domain/entities/user.entity";

export const authController = createApi({
  reducerPath: "authController",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["userState"],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequest>({
      queryFn: async (request) => ({
        data: await authService.login(request),
      }),
      invalidatesTags: ["userState"],
    }),
    getMe: builder.query<User, void>({
      queryFn: async () => {
        return {
          data: await authService.getMe(),
        };
      },
      providesTags: ["userState"],
    }),
    register: builder.mutation<void, RegisterRequest>({
      queryFn: async (request) => ({
        data: await authService.register(request),
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyGetMeQuery, useRegisterMutation } =
  authController;

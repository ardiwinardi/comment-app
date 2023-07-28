import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CommentOrderBy } from "../../domain/comment.entity";

export interface CommentState {
  orderBy: CommentOrderBy;
}

const initialState: CommentState = {
  orderBy: CommentOrderBy.NEWEST,
};

export const commentSlice = createSlice({
  name: "authDialog",
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<CommentState["orderBy"]>) => {
      state.orderBy = action.payload;
    },
  },
});

export const { setOrderType } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;

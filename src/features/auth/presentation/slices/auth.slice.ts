import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthDialogState {
  type: "login" | "register";
}

const initialState: AuthDialogState = {
  type: "login",
};

export const authDialogSlice = createSlice({
  name: "authDialog",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<AuthDialogState["type"]>) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = authDialogSlice.actions;
export const authDialogReducer = authDialogSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  hallo: string;
}

export const initialState: AppState = {
  hallo: "Hallo World",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHallo: (state, action: PayloadAction<AppState["hallo"]>) => {
      state.hallo = action.payload;
    },
  },
});

export const { setHallo } = appSlice.actions;
export const appReducer = appSlice.reducer;

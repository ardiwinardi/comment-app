import { authDialogReducer } from "./../../features/auth/presentation/slices/auth.slice";

import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { authController } from "@src/features/auth/presentation/controllers/auth.controller";
import { commentController } from "@src/features/comment/presentation/controllers/comment.controller";
import { commentReducer } from "@src/features/comment/presentation/slices/comment.slice";
import { appReducer } from "./slices/app.slice";

const rootReducer = combineReducers({
  app: appReducer,
  [authController.reducerPath]: authController.reducer,
  [commentController.reducerPath]: commentController.reducer,
  authDialog: authDialogReducer,
  comment: commentReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      authController.middleware,
      commentController.middleware,
    ],
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

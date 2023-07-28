import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./features/auth/presentation/contexts/AuthContext.tsx";
import appRouter from "./router.tsx";
import { setupStore } from "./shared/redux/store.ts";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

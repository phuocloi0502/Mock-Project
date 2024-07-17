import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./utils/index.scss";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import router from "./routers/Router.jsx";
import store from "./redux/store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);

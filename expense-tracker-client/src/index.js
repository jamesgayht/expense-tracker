import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "./components/UserRegister";
import Login from "./components/UserLogin";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./components/auth/AuthProvider";
import GuestOnly from "./components/auth/GuestOnly";
import AuthOnly from "./components/auth/AuthOnly";
import Home from "./components/Home";
import { GlobalStyle } from "./styles/GlobalStyle";
import { GlobalProvider } from "./context/globalContext";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthOnly component={App} />,
  },
  {
    path: "/login",
    element: <GuestOnly component={Login} />,
  },
  {
    path: "/register",
    element: <GuestOnly component={Register} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <CookiesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CookiesProvider>
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

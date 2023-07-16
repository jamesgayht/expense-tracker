import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "./components/UserRegister";
import Login from "./components/UserLogin";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./components/auth/AuthProvider";
import GuestOnly from "./components/auth/GuestOnly";
import AuthOnly from "./components/auth/AuthOnly";
import Home from "./components/Home";
import Travel from "./components/TravelExpenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthOnly component={Home} />,
  },
  {
    path: "/login",
    element: <GuestOnly component={Login} />,
  },
  {
    path: "/register",
    element: <GuestOnly component={Register} />,
  },
  {
    path: "/travel",
    element: <AuthOnly component={Travel} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

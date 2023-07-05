import { createBrowserRouter } from "react-router-dom";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/signUp";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import App from "../App";
import Dashboard from "../views/Dashboard";
import Game from "../views/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  { path: "/game", element: <Game /> },
  { path: "/dashboard", element: <PrivateRoute > <Dashboard /></PrivateRoute> },
  { path: "/sign-in", element: <PublicRoute > <SignIn /> </PublicRoute>, },
  { path: "/sign-up", element: <PublicRoute > <SignUp /> </PublicRoute>, }
]);

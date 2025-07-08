import { createBrowserRouter } from "react-router";
import App from "../App"
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      }
    ]
  }
]);

export default router
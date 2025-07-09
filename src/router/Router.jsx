import { createBrowserRouter } from "react-router";
import App from "../App"
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import AddPost from "../Pages/UserDashboard/AddPost/AddPost";
import PrivateRoute from "../routes/PrivateRoute";
import UserDashboard from "../layouts/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },

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
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><UserDashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <div>This is user dashboard</div>
      },
      {
        path: "add-post",
        Component: AddPost
      }
    ]
  }
]);

export default router
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
import MyPosts from "../Pages/UserDashboard/MyPosts/MyPosts";
import MyProfile from "../Pages/UserDashboard/MyProfile/MyProfile";
import AdminRoute from "../routes/AdminRoute"
import Payment from "../Pages/Payment/Payment";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Comments from "../Pages/Comments/Comments";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "post/:id",
        Component: PostDetails
      },
      {
        path: "comments/:postId",
        Component: Comments
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
      },
      {
        path: "my-posts",
        Component: MyPosts
      },
      {
        path: "my-profile",
        Component: MyProfile
      },
      {
        path: "payment",
        Component: Payment
      },
      {
        path: "admin-profile",
        element: <AdminRoute><div>This is admin</div></AdminRoute>
      },
    ]
  }
]);

export default router
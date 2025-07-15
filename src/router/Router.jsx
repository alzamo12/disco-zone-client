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
import AdminDashboard from "../layouts/AdminDashboard"
import Forbidden from "../Pages/Forbidden/Forbidden";
import UsersTable from "../Pages/AdminDashboard/UsersTable";
import MakeAnnouncement from "../Pages/AdminDashboard/MakeAnnouncement/MakeAnnouncement";
import ReportedComments from "../Pages/AdminDashboard/ReportedComments/ReportedComments";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile/AdminProfile"
const router = createBrowserRouter([
  // normale home routes
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
      {
        path: "forbidden",
        Component: Forbidden
      },

    ]
  },
  // auth related routes
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
  // user dashboard related routes
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

    ]
  },
  // admin related routes
  {
    path: '/admin-dashboard',
    element: <AdminRoute><AdminDashboard /></AdminRoute>,
    children: [
      {
        path: "manage-users",
        Component: UsersTable
      },
      {
        path: "make-announcement",
        Component: MakeAnnouncement
      },
      {
        path: "reported-comments",
        Component: ReportedComments
      },
      {
        path: "admin-profile",
        Component: AdminProfile
      },
    ]
  }
]);

export default router
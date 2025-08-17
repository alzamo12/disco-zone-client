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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import FAQ from "../Pages/FAQ/FAQ";
import AllPosts from "../Pages/AllPosts/AllPosts";
import Overview from "../Pages/UserDashboard/Overview/Overview";
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
      {
        path: "membership",
        Component: Payment
      },
      {
        path: "about-us",
        Component: AboutUs
      },
      {
        path: "faq",
        Component: FAQ
      },
      {
        path: 'posts',
        Component: AllPosts
      }
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
        path: "overview",
        Component: Overview
      }
    ]
  },
  // admin related routes
  {
    path: '/admin-dashboard',
    element: <PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>,
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
      {
        path: "overview",
        Component: Overview
      },
      {
        path: 'my-profile',
        Component: MyProfile
      }
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);

export default router
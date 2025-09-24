import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Posts from "../pages/Posts/Posts";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/auth/Profile/Profile";
import ChangePassword from "../pages/auth/ChangePassword/ChangePassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),

      },
       {
        path: "/posts/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />,
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuthRoutes>
            <Register />,
          </ProtectedAuthRoutes>
        ),
      },
         {
        path: "/change-password",
        element: (
          <ProtectedRoutes>
            <ChangePassword />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Admin,
  Dashboard,
  Login,
  PageNotFound,
  Register,
  Signup,
} from "./Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/:name/:register_id/:email_id",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

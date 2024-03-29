import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage/LandingPage";
import ExercisePage from "../components/ExercisePage/ExercisePage";
import PostPage from "../components/PostPage/PostPage";
import Layout from "./Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "exercises",
        element: <ExercisePage />,
      },
      {
        path: "posts",
        element: <PostPage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage/LandingPage";
import ExercisePage from "../components/ExercisePage/ExercisePage";
import PostPage from "../components/PostPage/PostPage";
import ChestPage from "../components/ExerciseTypes/ChestPage";
import TricepsPage from "../components/ExerciseTypes/TricepsPage";
import BackPage from "../components/ExerciseTypes/BackPage";
import BicepsPage from "../components/ExerciseTypes/BicepsPage";
import ShouldersPage from "../components/ExerciseTypes/ShouldersPage";
import LegsPage from "../components/ExerciseTypes/LegsPage";
import CardioPage from "../components/ExerciseTypes/CardioPage";
import AbsPage from "../components/ExerciseTypes/AbsPage";
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
      {
        path: "/exercises/chest",
        element: <ChestPage />,
      },
      {
        path: "/exercises/triceps",
        element: <TricepsPage />,
      },
      {
        path: "/exercises/back",
        element: <BackPage />,
      },
      {
        path: "/exercises/biceps",
        element: <BicepsPage />,
      },
      {
        path: "/exercises/shoulders",
        element: <ShouldersPage />,
      },
      {
        path: "/exercises/legs",
        element: <LegsPage />,
      },
      {
        path: "/exercises/cardio",
        element: <CardioPage />,
      },
      {
        path: "/exercises/abs",
        element: <AbsPage />,
      },
    ],
  },
]);

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseComments } from "../../redux/exerciseCommentReducer";
import "./ExercisePage.css";

function ExercisePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exercises = useSelector((state) => state.exerciseState);
  const types = useSelector((state) => state.exerciseState);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchAllExercises());
    dispatch(getExerciseTypes);
  }, [dispatch]);

  // console.log(exercises, "here is the state of exercises");
  // console.log(types, "here is the types");
  console.log(user);
  return (
    <>
      <h1>This is the Exercise Page</h1>
      <div className="exercises-type-container">
        <NavLink className="type-box" to="/exercises/chest">
          Chest
          <img
            className="type-image"
            src="https://i.postimg.cc/y8d7bbQM/chest-image.jpg"
            alt="chest"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/triceps">
          Triceps
          <img
            className="type-image"
            src="https://i.postimg.cc/HkQ9F6rt/tricep-image.jpg"
            alt="triceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/back">
          Back
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="back"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/biceps">
          Biceps
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="biceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/shoulders">
          Shoulders
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="biceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/legs">
          Legs
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="biceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/cardio">
          Cardio
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="biceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/abs">
          Abs
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="biceps"
          />
        </NavLink>
      </div>
    </>
  );
}

export default ExercisePage;

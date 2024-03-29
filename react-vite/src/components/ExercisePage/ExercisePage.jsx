import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseComments } from "../../redux/exerciseCommentReducer";

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
      <div>
        <NavLink to="/exercises/chest">Chest</NavLink>
        <NavLink to="/exercises/triceps">Triceps</NavLink>
        <NavLink to="/exercises/back">Back</NavLink>
        <NavLink to="exercises/biceps">Biceps</NavLink>
        <NavLink to="exercises/shoulders">Biceps</NavLink>
        <NavLink to="exercises/legs">Legs</NavLink>
        <NavLink to="exercises/cardio">Cardio</NavLink>
        <NavLink to="exercises/abs">Abs</NavLink>
      </div>
    </>
  );
}

export default ExercisePage;

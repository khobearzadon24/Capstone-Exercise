import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseComments } from "../../redux/exerciseCommentReducer";
import "./ExerciseTypes.css";

function ChestPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exercises = useSelector((state) => state.exerciseState);
  const types = useSelector((state) => state.exerciseState);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchAllExercises());
    dispatch(getExerciseTypes);
  }, [dispatch]);

  let exercisesArr = Object.values(exercises);
  console.log(exercisesArr, "here is the array of exercises");
  const resultArr = exercisesArr.filter((info) => info.type === "Chest");
  console.log(resultArr, "here is the resultArr");
  // console.log(types, "here is the types");
  console.log(user);
  return (
    <div>
      <h1 className="type-title">Chest Exercises</h1>
      <div className="exerciseDivs">
        {resultArr?.map((exercise, idx) => (
          <div
            className="exerciseCard"
            key={idx}
            onClick={() => {
              navigate(`/exercises/${exercise.id}`);
            }}
          >
            <div className="info">
              <p className="name">{exercise.name}</p>
            </div>
            <img className="exerCardImage" src={exercise?.imgUrl} />
            {user?.id == exercise?.userId && (
              <button
                className="edit-exercise"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/exercises/${exercise?.id}/update`);
                }}
              >
                Edit Exercise
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChestPage;

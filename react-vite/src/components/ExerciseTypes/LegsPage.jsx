import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseComments } from "../../redux/exerciseCommentReducer";

function LegsPage() {
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
  const resultArr = exercisesArr.filter((info) => info.type === "Legs");
  console.log(resultArr, "here is the resultArr");
  // console.log(exercises, "here is the state of exercises");
  // console.log(types, "here is the types");
  console.log(user);
  return (
    <>
      <h1>This is the Legs Page</h1>
      <hr />
      <div className="exerciseDivs">
        {resultArr?.map((exercise, idx) => (
          <div
            className="exerciseCard"
            // style={{ backgroundColor: `${user?.id == restaurant?.owner_id ? "#64B41C" : null}` }}
            key={idx}
            onClick={() => {
              navigate(`/exercises/${exercise.id}`);
            }}
          >
            <div className="info">
              <p className="name">{exercise.name}</p>
            </div>
            <img className="excerCardImage" src={exercise?.imgUrl} />
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
    </>
  );
}

export default LegsPage;

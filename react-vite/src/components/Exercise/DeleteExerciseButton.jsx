import { useDispatch } from "react-redux";
import { deleteExercise } from "../../redux/exerciseReducer";
import { useNavigate } from "react-router-dom";

function DeleteExerciseButton({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeExercise = async (e) => {
    e.preventDefault();
    dispatch(deleteExercise(id)).then(navigate("/"));
  };

  return (
    <button
      className="delete-exercise-button"
      onClick={(e) => {
        if (
          window.confirm(
            "Are you sure you want to delete this exercise? It will erase this exercise from the web page."
          )
        ) {
          removeExercise(e);
        }
      }}
    >
      Delete Exercise
    </button>
  );
}

export default DeleteExerciseButton;

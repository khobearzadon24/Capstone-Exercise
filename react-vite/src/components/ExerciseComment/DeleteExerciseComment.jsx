import { useDispatch } from "react-redux";
import {
  fetchAllExerciseComments,
  removeExerciseComment,
} from "../../redux/exerciseCommentReducer";
import { useParams } from "react-router-dom";
import "./DeleteExerciseComment.css";

function DeleteExerciseCommentButton({ id }) {
  const dispatch = useDispatch();
  const { exerciseId } = useParams();

  const deleteExerciseComment = () => {
    // e.preventDefault();
    dispatch(removeExerciseComment(id));
    dispatch(fetchAllExerciseComments(exerciseId));
    // figure out the navigate
  };

  return (
    <button
      className="delete-exercise-button"
      onClick={(e) => {
        if (
          window.confirm(
            "Are you sure you want to delete this exercise comment?"
          )
        ) {
          deleteExerciseComment(e);
        }
        window.location.reload();
      }}
    >
      Delete Comment
    </button>
  );
}

export default DeleteExerciseCommentButton;

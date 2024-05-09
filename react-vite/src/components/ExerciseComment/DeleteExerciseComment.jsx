import { useDispatch } from "react-redux";
import {
  fetchAllExerciseComments,
  removeExerciseComment,
} from "../../redux/exerciseCommentReducer";
import { useParams } from "react-router-dom";
import "./DeleteExerciseComment.css";
import { useModal } from "../../context/Modal";

function DeleteExerciseCommentButton({ id }) {
  const dispatch = useDispatch();
  const { exerciseId } = useParams();
  const { closeModal } = useModal();

  const deleteExerciseComment = async () => {
    // e.preventDefault();
    await dispatch(removeExerciseComment(id));
    dispatch(fetchAllExerciseComments(exerciseId));
    closeModal();
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
        // window.location.reload();
      }}
    >
      Delete Comment
    </button>
  );
}

export default DeleteExerciseCommentButton;

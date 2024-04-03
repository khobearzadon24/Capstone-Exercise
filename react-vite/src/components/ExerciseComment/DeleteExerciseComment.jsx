import { useDispatch } from "react-redux";
// import { deleteRestaurant } from "../../redux/restaurantReducer";
import {
  fetchAllExerciseComments,
  removeExerciseComment,
} from "../../redux/exerciseCommentReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./DeleteExerciseComment.css";

function DeleteExerciseCommentButton({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

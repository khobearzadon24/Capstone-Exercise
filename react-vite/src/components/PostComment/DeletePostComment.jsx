import { useDispatch } from "react-redux";
// import {
//   fetchAllExerciseComments,
//   removeExerciseComment,
// } from "../../redux/exerciseCommentReducer";
import {
  fetchAllPostComments,
  removePostComment,
} from "../../redux/postCommentReducer";
import { useParams } from "react-router-dom";
import "../ExerciseComment/DeleteExerciseComment.css";
import { useModal } from "../../context/Modal";

function DeletePostCommentButton({ id }) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { closeModal } = useModal();

  const deletePostComment = () => {
    // e.preventDefault();
    dispatch(removePostComment(id));
    dispatch(fetchAllPostComments(postId));
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
          deletePostComment(e);
        }
        window.location.reload();
      }}
    >
      Delete Comment
    </button>
  );
}

export default DeletePostCommentButton;

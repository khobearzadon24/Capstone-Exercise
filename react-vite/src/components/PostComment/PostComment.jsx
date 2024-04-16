import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import {
//   createExerciseComment,
//   fetchAllExerciseComments,
// } from "../../redux/exerciseCommentReducer";
import {
  createPostComment,
  fetchAllPostComments,
} from "../../redux/postCommentReducer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../ExerciseComment/ExerciseComment.css";

function AddPostCommentModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const { postId } = useParams();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const payload = {
      description,
      postId,
    };
    const newPostComment = await dispatch(createPostComment(payload, postId));
    await dispatch(fetchAllPostComments(postId));
    if (newPostComment.errors) setErrors(newPostComment.errors);
    closeModal();
    // window.location.reload();
  };

  return (
    <>
      <form className="exercise-comment-form" onSubmit={handleSubmit}>
        <input
          className="exercise-comment-area"
          type="text"
          placeholder="Type Comment Here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={2}
          maxLength={100}
        />
        <p className="exercise-errors">
          {errors.description ? errors.description : null}
        </p>
        <button className="exercise-comment-submit" type="submit">
          Submit Comment
        </button>
      </form>
    </>
  );
}

export default AddPostCommentModal;

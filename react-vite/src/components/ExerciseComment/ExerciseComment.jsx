import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  createExerciseComment,
  fetchAllExerciseComments,
} from "../../redux/exerciseCommentReducer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ExerciseComment.css";

function AddExerciseCommentModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const { exerciseId } = useParams();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const payload = {
      description,
      exerciseId,
    };
    const newExerciseComment = await dispatch(
      createExerciseComment(payload, exerciseId)
    );
    await dispatch(fetchAllExerciseComments(exerciseId));
    if (newExerciseComment.errors) setErrors(newExerciseComment.errors);
    closeModal();
    window.location.reload();
    // reset();
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

export default AddExerciseCommentModal;

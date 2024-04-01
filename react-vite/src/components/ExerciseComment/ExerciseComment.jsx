import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createExerciseComment } from "../../redux/exerciseCommentReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function AddExerciseCommentModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      description,
      exerciseId,
    };
    const newExerciseComment = await dispatch(
      createExerciseComment(payload, exerciseId)
    );
    if (newExerciseComment.errors) setErrors(newExerciseComment.errors);
    else navigate(`/exercises/${exerciseId}`);
  };

  return (
    <>
      <p>Add Comment</p>
      <form onSubmit={handleSubmit}>
        <input
          className="exercise-comment-area"
          type="text"
          placeholder="Enter in your exercise comment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <p className="exercise-errors">
          {errors.description ? errors.description : null}
        </p>
        <button
          className="exercise-comment-submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit Comment
        </button>
      </form>
    </>
  );
}

export default AddExerciseCommentModal;

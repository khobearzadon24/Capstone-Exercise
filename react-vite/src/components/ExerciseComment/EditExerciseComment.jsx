import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchExerciseComment,
  editExerciseComment,
} from "../../redux/exerciseCommentReducer";

import "./EditExerciseComment.css";

function UpdateExerciseComment({ id }) {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const exercise = useSelector((state) => state.exerciseState);
  const exerciseComment = useSelector(
    (state) => state.exerciseCommentState[id]
  );
  console.log(exerciseComment, "here is the comments");

  console.log(exercise, "over here");
  //   const exerciseTypes = useSelector((state) => state.exerciseState.types);

  //   const [name, setName] = useState(exercise?.name);
  const [description, setDescription] = useState(exerciseComment?.description);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchExerciseComment(id));
    setDescription(exerciseComment?.description);
  }, [dispatch, id, exerciseComment?.description]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      description,
    };

    const response = await dispatch(editExerciseComment(id, payload));
    if (response?.errors) setErrors(response?.errors);
    // else navigate(`/exercises/${exerciseId}`);
    window.location.reload();
  };

  return (
    <div>
      {exerciseComment && (
        <div className="exercise-page-create">
          <form className="exercise-form" onSubmit={onSubmit}>
            <h1 className="exercise-comment-edit-title ">
              Edit Exercise Comment
            </h1>
            <div className="column-styles">
              <p className="edit-description">Description</p>
              <input
                className="input-area-description-edit"
                type="text"
                placeholder="Enter A Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={2}
                maxLength={100}
              ></input>
              <p className="exercise-errors">
                {errors.description ? errors.description : null}
              </p>
            </div>
            <button className="exercise-comment-submit-edit" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateExerciseComment;

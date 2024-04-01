import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchExerciseComment,
  editExerciseComment,
} from "../../redux/exerciseCommentReducer";

function UpdateExerciseComment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exerciseCommentId } = useParams();
  const exerciseComment = useSelector(
    (state) => state.exerciseCommentState[exerciseCommentId]
  );
  //   const exerciseTypes = useSelector((state) => state.exerciseState.types);

  //   const [name, setName] = useState(exercise?.name);
  const [description, setDescription] = useState(exercise?.description);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchExerciseComment(exerciseCommentId));
    setDescription(exerciseComment?.description);
  }, [dispatch, exerciseCommentId, exerciseComment?.description]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      description,
    };

    const response = await dispatch(
      editExerciseComment(exerciseCommentId, payload)
    );
    if (response.errors) setErrors(response.errors);
    else navigate(`/exercises/${exerciseComment?.exerciseId}`);
  };

  return (
    <div>
      {exerciseComment && (
        <div className="exercise-page-create">
          <form className="exercise-form" onSubmit={onSubmit}>
            <h1 className="exercise-title-form">Edit Exercise Comment</h1>
            <div className="column-styles">
              <p>Description</p>
              <input
                className="input-area"
                type="text"
                placeholder="Enter A Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // required
              ></input>
              <p className="exercise-errors">
                {errors.description ? errors.description : null}
              </p>
            </div>
            <button className="exercise-comment-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateExerciseComment;

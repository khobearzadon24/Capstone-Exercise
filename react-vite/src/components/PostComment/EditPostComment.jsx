import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { useParams } from "react-router-dom";

// import {
//   fetchExerciseComment,
//   editExerciseComment,
// } from "../../redux/exerciseCommentReducer";
import {
  fetchPostComment,
  editPostComment,
} from "../../redux/postCommentReducer";

import "../ExerciseComment/EditExerciseComment.css";

function UpdatePostComment({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const { exerciseId } = useParams();
  // const { postId } = useParams();
  const post = useSelector((state) => state.postState);
  const postComment = useSelector((state) => state.postCommentState[id]);
  console.log(postComment, "here is the comments");

  console.log(post, "over here");
  //   const exerciseTypes = useSelector((state) => state.exerciseState.types);

  //   const [name, setName] = useState(exercise?.name);
  const [description, setDescription] = useState(postComment?.description);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPostComment(id));
    setDescription(postComment?.description);
  }, [dispatch, id, postComment?.description]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      description,
    };

    const response = await dispatch(editPostComment(id, payload));
    if (response?.errors) setErrors(response?.errors);
    // else navigate(`/exercises/${exerciseId}`);
    closeModal();
    window.location.reload();
  };

  return (
    <div>
      {postComment && (
        <div className="exercise-page-create">
          <form className="exercise-form" onSubmit={onSubmit}>
            <h1 className="exercise-comment-edit-title ">Edit Post Comment</h1>
            <div className="column-styles">
              <p className="edit-description">Description</p>
              <input
                className="input-area-description-edit"
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
            <button className="exercise-comment-submit-edit" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdatePostComment;

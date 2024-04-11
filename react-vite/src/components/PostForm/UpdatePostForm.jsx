import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import {
//   fetchExercise,
//   editExercise,
//   getExerciseTypes,
// } from "../../redux/exerciseReducer";

import { fetchPost, editPost } from "../../redux/postReducer";
import { useModal } from "../../context/Modal";

function UpdatePost({ id }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { postId } = useParams();
  const { closeModal } = useModal();
  const post = useSelector((state) => state.postState[id]);
  //   const exerciseTypes = useSelector((state) => state.exerciseState.types);

  const [name, setName] = useState(post?.name);
  const [description, setDescription] = useState(post?.description);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPost(id));
    setName(post?.name);
    setDescription(post?.description);
  }, [dispatch, id, post?.name, post?.description]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
    };
    // const formData = new FormData();
    // formData.append("imgUrl", imgUrl);
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("type", type);
    // setImgUrlLoading(true);

    const response = await dispatch(editPost(id, payload));
    // if (response?.errors) setErrors(response?.errors);
    closeModal();
    window.location.reload();
  };

  return (
    <div>
      {post && (
        <div className="exercise-page-create">
          <form className="exercise-form" onSubmit={onSubmit}>
            <h1 className="exercise-title-form">Update Your Post</h1>
            <div className="column-styles">
              <p>Name</p>
              <input
                className="input-area"
                type="text"
                placeholder="Enter A Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
              <p className="exercise-errors">
                {errors.name ? errors.name : null}
              </p>
            </div>

            <div className="column-styles">
              <p>Description</p>
              <input
                className="input-area-description"
                type="text"
                placeholder="Enter A Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></input>
              <p className="exercise-errors">
                {errors.description ? errors.description : null}
              </p>
            </div>

            <button className="exercise-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdatePost;

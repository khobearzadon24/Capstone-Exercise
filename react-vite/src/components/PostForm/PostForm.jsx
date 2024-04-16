import { useState } from "react";
import { useDispatch } from "react-redux";
import { writePost } from "../../redux/postReducer";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

function PostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
    };

    const newPost = await dispatch(writePost(payload));
    if (newPost.errors) setErrors(newPost.errors);
    closeModal();
    // window.location.reload();
  };

  return (
    <>
      <div>
        <div className="exercise-page-create">
          <form className="exercise-form" onSubmit={onSubmit}>
            <h1 className="exercise-title-form">Create a Post</h1>
            <div className="column-styles">
              <p>Name</p>
              <input
                className="input-area"
                type="text"
                placeholder="Enter Post Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
                maxLength={30}
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
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={3}
                maxLength={75}
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
      </div>
    </>
  );
}

export default PostForm;

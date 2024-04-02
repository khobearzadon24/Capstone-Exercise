import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchExercise,
  editExercise,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import "./ExerciseForm.css";

function UpdateExercise({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const exercise = useSelector((state) => state.exerciseState[exerciseId]);
  const exerciseTypes = useSelector((state) => state.exerciseState.types);

  const [name, setName] = useState(exercise?.name);
  const [description, setDescription] = useState(exercise?.description);
  const [type, setType] = useState(exercise?.type);
  const [imgUrl, setImgUrl] = useState(exercise?.imgUrl);
  const [imgUrlLoading, setImgUrlLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchExercise(exerciseId)).then(dispatch(getExerciseTypes()));
    setName(exercise?.name);
    setDescription(exercise?.description);
    setType(exercise?.type);
    setImgUrl(exercise?.imgUrl);
  }, [
    dispatch,
    exerciseId,
    exercise?.name,
    exercise?.description,
    exercise?.type,
    exercise?.imgUrl,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // const payload = {
    //   name,
    //   description,
    //   type,
    //   imgUrl: imgUrl,
    // };
    const formData = new FormData();
    formData.append("imgUrl", imgUrl);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("type", type);
    setImgUrlLoading(true);

    const response = await dispatch(editExercise(exerciseId, formData));
    // if (response.errors) setErrors(response.errors);
    // navigate(`/exercises/${exerciseId}`);
    window.location.reload();
  };

  return (
    <div>
      {exercise && exerciseTypes && (
        <div className="exercise-page-create">
          <form
            className="exercise-form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <h1 className="exercise-title-form">Update Your Exercise</h1>
            <div className="column-styles">
              <p>Name</p>
              <input
                className="input-area"
                type="text"
                placeholder="Enter A Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // required
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
                // required
              ></input>
              <p className="exercise-errors">
                {errors.description ? errors.description : null}
              </p>
            </div>
            <div className="column-styles">
              <p>Type</p>
              <select
                className="input-area"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value={""} disabled defaultValue={""}>
                  Select Type
                </option>
                {exerciseTypes.map((exercise, idx) => (
                  <option key={idx}>{exercise}</option>
                ))}
              </select>
              <p className="exercise-errors">
                {errors.type ? errors.type : null}
              </p>
            </div>
            <div className="column-styles">
              <p>Image Url</p>
              <input
                className="input-area"
                type="file"
                accept="image/*"
                placeholder="Enter New Image Url"
                // value={imgUrl}
                onChange={(e) => setImgUrl(e.target.files[0])}
              ></input>
              <p className="exercise-errors">
                {errors.imgUrl ? errors.imgUrl : null}
              </p>
            </div>
            <button className="exercise-submit" type="submit">
              Submit
            </button>
            {imgUrlLoading && <p>Loading...</p>}
          </form>
          {/* <img className="exer-logo" src={exercise?.imgUrl} alt="exer-logo" /> */}
        </div>
      )}
    </div>
  );
}

export default UpdateExercise;

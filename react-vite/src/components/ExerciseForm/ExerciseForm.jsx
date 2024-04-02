import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeExercise } from "../../redux/exerciseReducer";
import { useNavigate } from "react-router-dom";
import { getExerciseTypes } from "../../redux/exerciseReducer";

function ExerciseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exerciseTypes = useSelector((state) => state.exerciseState.types);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [imgUrlLoading, setImgUrlLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getExerciseTypes());
  }, [dispatch]);

  console.log(exerciseTypes, "here is the types");
  const onSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("imgUrl", imgUrl)
    // await dispatch(writeExercise(payload))
    const formData = new FormData();
    formData.append("imgUrl", imgUrl);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("type", type);
    setImgUrlLoading(true);
    // const payload = {
    //   name,
    //   description,
    //   type,
    //   imgUrl: imgUrl,
    // };
    const newExercise = await dispatch(writeExercise(formData));
    // if (formData.errors) setErrors(formData.errors);
    navigate(`/exercises/my-exercises`);
  };

  return (
    <>
      <h1>This is the form page</h1>
      <div>
        {exerciseTypes && (
          <div className="exercise-page-create">
            <form
              className="exercise-form"
              onSubmit={onSubmit}
              encType="multipart/form-data"
            >
              <h1 className="exercise-title-form">Create An Exercise</h1>
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
                  className="input-area"
                  type="text"
                  placeholder="Enter the description of the exercise."
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
          </div>
        )}
      </div>
    </>
  );
}

export default ExerciseForm;
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import "./ExercisePage.css";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function ExercisePage() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // const exercises = useSelector((state) => state.exerciseState);
  // const types = useSelector((state) => state.exerciseState);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(fetchAllExercises());
    dispatch(getExerciseTypes);
  }, [dispatch]);

  // console.log(exercises, "here is the state of exercises");
  // console.log(types, "here is the types");
  console.log(user);
  return (
    <div className="exercises-page">
      <h1 className="types-title">Type of Exercises</h1>
      {user && (
        // <button
        //   className="style-hover"
        //   onClick={() => navigate("/exercises/new")}
        // >
        //   Add Exercise
        // </button>
        <div>
          <OpenModalButton
            className="add-button"
            buttonText="Add Exercise"
            onItemClick={closeMenu}
            modalComponent={<ExerciseForm />}
          />
        </div>
      )}
      <div className="exercises-type-container">
        <NavLink className="type-box" to="/exercises/chest">
          <h1 className="type-of-title">Chest</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/y8d7bbQM/chest-image.jpg"
            alt="chest"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/triceps">
          <h1 className="type-of-title">Triceps</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/HkQ9F6rt/tricep-image.jpg"
            alt="triceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/back">
          <h1 className="type-of-title">Back</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/W45gPCT0/back-image.jpg"
            alt="back"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/biceps">
          <h1 className="type-of-title">Biceps</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/hvQ21nxd/bicep-image.png"
            alt="biceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/shoulders">
          <h1 className="type-of-title">Shoulders</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/xdF7vt7B/shoulder-image.jpg"
            alt="shoulders"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/legs">
          <h1 className="type-of-title">Legs</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/sxK5W0Hh/legs-image.jpg"
            alt="legs"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/cardio">
          <h1 className="type-of-title">Cardio</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/8CVs1mtQ/cardio-image.png"
            alt="cardio"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/abs">
          <h1 className="type-of-title">Abs</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/d0TX98Y1/abs-image.png"
            alt="abs"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default ExercisePage;

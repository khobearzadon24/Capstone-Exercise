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
    dispatch(getExerciseTypes());
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
            src="https://i.postimg.cc/3rt1p0tf/Designer.jpg"
            alt="chest"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/triceps">
          <h1 className="type-of-title">Triceps</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/Hs949cW7/donald-triceps.jpg"
            alt="triceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/back">
          <h1 className="type-of-title">Back</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/fLXtBpsR/Screenshot-2024-04-05-at-3-22-59-PM.png"
            alt="back"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/biceps">
          <h1 className="type-of-title">Biceps</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/MKcTDgY2/donald-biceps.jpg"
            alt="biceps"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/shoulders">
          <h1 className="type-of-title">Shoulders</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/qq2tD4Bb/mickey-shoulders.png"
            alt="shoulders"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/legs">
          <h1 className="type-of-title">Legs</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/2j1gb33F/donald-legs.png"
            alt="legs"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/cardio">
          <h1 className="type-of-title">Cardio</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/fbDrznH6/cardio-disney.jpg"
            alt="cardio"
          />
        </NavLink>
        <NavLink className="type-box" to="/exercises/abs">
          <h1 className="type-of-title">Abs</h1>
          <img
            className="type-image"
            src="https://i.postimg.cc/1zph5rcj/goofy-with-huge-muscles-working-out-2-by-jesse220-dgp0214-pre.jpg"
            alt="abs"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default ExercisePage;

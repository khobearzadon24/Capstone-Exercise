import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchOwnerExercises } from "../../redux/exerciseReducer";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteExerciseModal from "../DeleteExercise/DeleteExerciseModal";
import UpdateExercise from "../ExerciseForm/UpdateExerciseForm";
import "./OwnerExercises.css";

function OwnerExercises() {
  const exercise = useSelector((state) => state.exerciseState);
  const [postExercise, setPostExercise] = useState(false);

  const renderExercise = () => {
    setPostExercise((arg) => !arg);
  };
  // console.log(exercise), "EXERCISE");

  const exerciseArr = Object.values(exercise);
  console.log(exerciseArr, "this is the exercise arr");

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
    // console.log("whatever");
    dispatch(fetchOwnerExercises());
    // console.log("below here");
  }, [dispatch, postExercise]);

  return (
    <>
      <div className="manage-page-container">
        <div className="manage-all-container">
          <h1 className="manage-title">Manage Your Exercises</h1>
          {exerciseArr.map((exercise, idx) => (
            <div key={idx} className="manage-container">
              <div className="exercise-description-container">
                <p className="exercise-name">{`${exercise?.name}`}</p>
                <p className="exercise-description">
                  {`${exercise?.description}`}
                </p>
              </div>
              <NavLink
                className="exercise-manage-container"
                to={`/exercises/${exercise?.id}`}
              >
                <img
                  className="exercise-img-manage"
                  src={`${exercise?.imgUrl}`}
                  alt={`${exercise?.name}`}
                />
              </NavLink>
              <div className="update-delete-owner">
                <div>
                  <OpenModalButton
                    className="edit-button"
                    buttonText="Edit Exercise"
                    onItemClick={closeMenu}
                    modalComponent={<UpdateExercise id={exercise?.id} />}
                  />
                </div>
                <div className="delete-button">
                  <OpenModalButton
                    buttonText="Delete Exercise"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteExerciseModal exercise={exercise} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OwnerExercises;

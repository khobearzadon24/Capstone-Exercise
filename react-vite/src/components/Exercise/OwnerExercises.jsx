import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchOwnerExercises } from "../../redux/exerciseReducer";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteExerciseModal from "../DeleteExercise/DeleteExerciseModal";

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
      <div>
        <p>This is the owner exercises page</p>
      </div>
      <div className="manage-page-container">
        <h1>Manage Your Exercises</h1>
        <div className="manage-all-container">
          {exerciseArr.map((exercise) => (
            <div key={exercise?.id} className="manage-container">
              <NavLink
                className="exercise-manage-container"
                to={`/exercises/${exercise.id}`}
              >
                <img
                  className="exercise-img"
                  src={`${exercise.imgUrl}`}
                  alt={`${exercise.name}`}
                />
                <div className="exercise-name-description">
                  <p className="exercise-name">{`${exercise.name}`}</p>
                  <div className="exercise-description-container">
                    <p className="exercise-description">
                      {`${exercise.description}`}
                    </p>
                  </div>
                </div>
              </NavLink>
              <div className="update-delete">
                <NavLink
                  className="update-button"
                  to={`/exercises/${exercise.id}/update`}
                >
                  Edit Exercise
                </NavLink>
                <div className="delete-button">
                  <OpenModalButton
                    buttonText="Delete Exercise"
                    onItemClick={closeMenu}
                    modalComponent={
                      <DeleteExerciseModal
                        exercise={exercise}
                        renderExercise={renderExercise}
                      />
                    }
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

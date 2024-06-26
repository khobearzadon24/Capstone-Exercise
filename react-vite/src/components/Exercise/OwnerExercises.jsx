import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchOwnerExercises } from "../../redux/exerciseReducer";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteExerciseModal from "../DeleteExercise/DeleteExerciseModal";
import UpdateExercise from "../ExerciseForm/UpdateExerciseForm";
import "./OwnerExercises.css";

function OwnerExercises() {
  const navigate = useNavigate();
  const exercise = useSelector((state) => state.exerciseState);
  const [postExercise, setPostExercise] = useState(false);

  console.log(exercise, "here is the exercise");
  let exerciseArr = Object.values(exercise);

  // exerciseArr = exerciseArr.pop();
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
          {exerciseArr.length === 0 && (
            <NavLink className="no-exercises-yet" to={`/exercises`}>
              You can create an exercise on the exercise page! Just click me!
            </NavLink>
          )}
          {exerciseArr.map((exercise, idx) => (
            <div key={idx} className="manage-container">
              <div className="exercise-description-container">
                <p className="exercise-name">{`${exercise?.name}`}</p>
                <p className="exercise-description">
                  {`${exercise?.description}`}
                </p>
              </div>
              <div className="exercise-manage-container">
                <img
                  className="exercise-img-manage"
                  onClick={() => navigate(`/exercises/${exercise?.id}`)}
                  src={`${exercise?.imgUrl}`}
                  alt={`${exercise?.name}`}
                />
              </div>
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

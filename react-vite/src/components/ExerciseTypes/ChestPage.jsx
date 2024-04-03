import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseComments } from "../../redux/exerciseCommentReducer";
import "./ExerciseTypes.css";
import UpdateExercise from "../ExerciseForm/UpdateExerciseForm";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function ChestPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exercises = useSelector((state) => state.exerciseState);
  const types = useSelector((state) => state.exerciseState);
  const user = useSelector((state) => state.session.user);

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
    dispatch(fetchAllExercises());
    dispatch(getExerciseTypes);
  }, [dispatch]);

  let exercisesArr = Object.values(exercises);
  console.log(exercisesArr, "here is the array of exercises");
  const resultArr = exercisesArr.filter((info) => info.type === "Chest");
  console.log(resultArr, "here is the resultArr");
  // console.log(types, "here is the types");
  console.log(user);
  return (
    <div>
      <h1 className="type-title">Chest Exercises</h1>
      <div className="exerciseDivs">
        {resultArr?.map((exercise, idx) => (
          <div
            className="exerciseCard"
            key={idx}
            onClick={() => {
              navigate(`/exercises/${exercise.id}`);
            }}
          >
            <div className="info">
              <p className="name">{exercise.name}</p>
            </div>
            <img className="exerCardImage" src={exercise?.imgUrl} />
            {user?.id == exercise?.userId && (
              <div>
                <OpenModalButton
                  className="edit-button"
                  buttonText="Edit Exercise"
                  onItemClick={closeMenu}
                  modalComponent={<UpdateExercise id={exercise?.id} />}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChestPage;

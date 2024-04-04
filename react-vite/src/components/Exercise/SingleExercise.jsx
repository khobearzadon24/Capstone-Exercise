import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercise, getExerciseTypes } from "../../redux/exerciseReducer";
import DeleteExerciseButton from "./DeleteExerciseButton";
import AddExerciseCommentModal from "../ExerciseComment/ExerciseComment";
import {
  addExerciseComment,
  fetchAllExerciseComments,
} from "../../redux/exerciseCommentReducer";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateExerciseComment from "../ExerciseComment/EditExerciseComment";
import DeleteExerciseCommentButton from "../ExerciseComment/DeleteExerciseComment";
import "./SingleExercise.css";
import UpdateExercise from "../ExerciseForm/UpdateExerciseForm";

function SingleExercise() {
  const { exerciseId } = useParams();
  const dispatch = useDispatch();

  const exercise = useSelector((state) => state.exerciseState);
  // const exercise_comment = useSelector((state) => state.exerciseCommentState);

  // console.log(exercise_comment, "here is the exercise comments");
  // console.log(exercise, "here is the exercise you wanted");

  const commentsArr = exercise[exerciseId]?.exercise_comments;

  // console.log(commentsArr, "here are your comments");

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

  const user = useSelector((state) => state.session.user);
  //   const user_comment = useSelector((state) => state.session.user[id]);
  //   console.log(user_comment, "over here is the comment user");
  useEffect(() => {
    dispatch(fetchExercise(exerciseId))
      .then(dispatch(getExerciseTypes()))
      .then(dispatch(addExerciseComment()))
      .then(dispatch(fetchAllExerciseComments(exerciseId)));
    //   .then(dispatch(fetchOwnerMenuItems(restaurantId)));
  }, [dispatch, exerciseId]);

  return (
    <>
      {exercise && (
        <div className="exercise-details-container">
          <div className="exercise-image-container">
            <img
              className="exercise-image-single"
              src={exercise[exerciseId]?.imgUrl}
            ></img>
          </div>
          <div className="exercise-details-header-container">
            <h1 className="exercise-name">{exercise[exerciseId]?.name} </h1>
            <div className="made-by-container">
              <h1 className="made-by-name">
                Made by {exercise[exerciseId]?.firstName}{" "}
                {exercise[exerciseId]?.lastName}
              </h1>
            </div>
            <h1 className="exercise-decription">
              {exercise[exerciseId]?.description}
            </h1>
          </div>
          <div className="exercise-header-container">
            <h4 className="exercise-comments-title">Comments</h4>
          </div>
          <div className="exerciseDetails">
            <div className="exercise-comments-Container">
              {commentsArr?.length === 0 && <h1>No Comments Yet</h1>}
              {commentsArr?.map((comment) => (
                <div className="exercise-comments-Card" key={comment.id}>
                  <p className="name-exercise-comment">
                    {comment.firstName} {comment.lastName}
                  </p>
                  <div className="description-exercise-comment">
                    {comment?.description}
                    {comment?.userId === user?.id && (
                      <div className="edit-exercise-comment-button">
                        <OpenModalButton
                          buttonText="Edit Comment"
                          onItemClick={closeMenu}
                          modalComponent={
                            <UpdateExerciseComment id={comment?.id} />
                          }
                        />
                        <DeleteExerciseCommentButton
                          className="delete-button"
                          id={comment?.id}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {user && (
                <AddExerciseCommentModal className="add-comment-button" />
              )}
            </div>

            <div className="ManageExercise">
              {exercise[exerciseId]?.userId === user?.id && (
                <>
                  <OpenModalButton
                    buttonText="Edit Exercise"
                    onItemClick={closeMenu}
                    modalComponent={<UpdateExercise id={exerciseId} />}
                  />
                  <DeleteExerciseButton className="add-item" id={exerciseId} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleExercise;

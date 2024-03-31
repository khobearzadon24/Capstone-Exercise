import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercise, getExerciseTypes } from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import DeleteExerciseButton from "./DeleteExerciseButton";
// import DeleteMenuItemButton from "../MenuItems/DeleteMenuItemButton";
// import { fetchOwnerMenuItems } from "../../redux/menuItemReducer";

function SingleExercise() {
  const { exerciseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exercise = useSelector((state) => state.exerciseState);
  console.log(exercise, "here is the exercise you wanted");
  //   const menu_items = useSelector((state) => state.menuItemState);

  const commentsArr = exercise[exerciseId]?.Exercise_comments;

  console.log(commentsArr, "here are your comments");
  //   const menuItemsArr = Object.values(menu_items);

  const user = useSelector((state) => state.session.user);
  //   const user_comment = useSelector((state) => state.session.user[id]);
  //   console.log(user_comment, "over here is the comment user");
  useEffect(() => {
    dispatch(fetchExercise(exerciseId)).then(dispatch(getExerciseTypes()));
    //   .then(dispatch(fetchOwnerMenuItems(restaurantId)));
  }, [dispatch, exerciseId]);

  return (
    <>
      {exercise && (
        <div className="exercise-details-container">
          <div className="exercise-image-container">
            <img
              className="exercise-image"
              src={exercise[exerciseId]?.imgUrl}
            ></img>
          </div>
          <div className="exercise-details-header-container">
            <h1 className="exercise-name">{exercise[exerciseId]?.name} </h1>
            <div className="made-by-container">
              <h1>
                Made by {exercise[exerciseId]?.firstName}{" "}
                {exercise[exerciseId]?.lastName}
              </h1>
            </div>
          </div>
          <div className="exercise-header-container">
            <h4>Comments</h4>
          </div>
          <div className="exerciseDetails">
            <div className="exercise-comments-Container">
              {commentsArr?.map((comment) => (
                <div className="exercise-comments-Card" key={comment.id}>
                  <p className="name-exercise-comment">
                    {comment.firstName} {comment.lastName}
                  </p>
                  <p className="description-exercise-comment">
                    {comment.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="ManageExercise">
              {exercise[exerciseId]?.userId === user?.id && (
                <>
                  <h1>Manage Exercise</h1>
                  {/* <hr /> */}
                  <button
                    className="add-item"
                    onClick={() => navigate(`/exercises/${exerciseId}/update`)}
                  >
                    Edit Exercise
                  </button>
                  <DeleteExerciseButton
                    className="delete-button"
                    id={exerciseId}
                  />
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

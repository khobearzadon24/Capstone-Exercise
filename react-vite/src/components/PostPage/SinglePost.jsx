import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from "../../redux/postReducer";
// import DeleteExerciseButton from "./DeleteExerciseButton";
import DeletePostButton from "./DeletePost";
// import AddExerciseCommentModal from "../ExerciseComment/ExerciseComment";
import AddPostCommentModal from "../PostComment/PostComment";
import {
  addPostComment,
  fetchAllPostComments,
} from "../../redux/postCommentReducer";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdatePostComment from "../PostComment/EditPostComment";
import DeletePostCommentButton from "../PostComment/DeletePostComment";
import "../Exercise/SingleExercise.css";
// import UpdateExercise from "../ExerciseForm/UpdateExerciseForm";
import UpdatePost from "../PostForm/UpdatePostForm";

function SinglePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postState);
  // const exercise_comment = useSelector((state) => state.exerciseCommentState);

  // console.log(exercise_comment, "here is the exercise comments");
  // console.log(exercise, "here is the exercise you wanted");

  const commentsArr = post[postId]?.post_comments;

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
    dispatch(fetchPost(postId))
      .then(dispatch(addPostComment()))
      .then(dispatch(fetchAllPostComments(postId)));
    //   .then(dispatch(fetchOwnerMenuItems(restaurantId)));
  }, [dispatch, postId]);

  return (
    <>
      {post && (
        <div className="exercise-details-container">
          <div className="exercise-details-header-container">
            <h1 className="exercise-name">{post[postId]?.name} </h1>
            <div className="made-by-container">
              <h1 className="made-by-name">
                Made by {post[postId]?.firstName} {post[postId]?.lastName}
              </h1>
            </div>
            <h1 className="exercise-decription">{post[postId]?.description}</h1>
          </div>
          <div className="exercise-header-container">
            <h4 className="exercise-comments-title">Comments</h4>
          </div>
          <div className="exerciseDetails">
            <div className="exercise-comments-Container">
              {commentsArr?.length === 0 && (
                <h1 className="be-the-first">Be the first to comment!</h1>
              )}
              {commentsArr?.map((comment) => (
                <div className="exercise-comments-Card" key={comment.id}>
                  <p>{comment?.createdAt}</p>
                  <p className="name-exercise-comment">
                    {comment.firstName} {comment.lastName}
                  </p>
                  <div className="description-exercise-comment">
                    <p>{comment?.description}</p>
                    {/* {comment?.userId === user?.id && (
                      <div className="edit-exercise-comment-button">
                        <OpenModalButton
                          buttonText="Edit Comment"
                          onItemClick={closeMenu}
                          modalComponent={
                            <UpdatePostComment id={comment?.id} />
                          }
                        />
                        <DeletePostCommentButton
                          className="delete-button"
                          id={comment?.id}
                        />
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
              {/* {user && <AddPostCommentModal className="add-comment-button" />} */}
            </div>

            <div className="ManageExercise">
              {post[postId]?.userId === user?.id && (
                <>
                  <OpenModalButton
                    buttonText="Edit Post"
                    onItemClick={closeMenu}
                    modalComponent={<UpdatePost id={postId} />}
                  />
                  <OpenModalButton
                    buttonText="Delete Post"
                    onItemClick={closeMenu}
                    modalComponent={<DeletePostButton id={postId} />}
                  />
                  {/* <DeletePostButton className="add-item" id={postId} /> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SinglePost;

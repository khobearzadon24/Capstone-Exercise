import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { fetchAllPosts } from "../../redux/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllPostComments } from "../../redux/postCommentReducer";

function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.postState);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  let postArr = Object.values(posts);
  console.log(postArr, "here is the array of posts");

  return (
    <>
      <h1>This is the Post Page</h1>
      <hr />
      {user && (
        <button
          className="create-post-button"
          onClick={() => navigate("/posts/new")}
        >
          Create Post
        </button>
      )}
      <div className="postDivs">
        {postArr?.map((post, idx) => (
          <div className="postCard" key={idx}>
            <div className="info">
              <h1 className="name">{post.name}</h1>
              <p className="post-description">{post.description}</p>
            </div>
            {user?.id == post?.userId && (
              <button
                className="edit-exercise"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/posts/${post?.id}/update`);
                }}
              >
                Edit Post
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default PostPage;

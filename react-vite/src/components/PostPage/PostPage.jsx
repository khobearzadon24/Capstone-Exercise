import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPosts } from "../../redux/postReducer";
import { fetchAllPostComments } from "../../redux/postCommentReducer";
import "./PostPage.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import PostForm from "../PostForm/PostForm";
import UpdatePost from "../PostForm/UpdatePostForm";
import DeletePostButton from "./DeletePost";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.postState);
  const user = useSelector((state) => state.session.user);
  // const post_comment = useSelector((state) => state.postCommentState);
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
    dispatch(fetchAllPosts());
    // dispatch(fetchAllPostComments());
  }, [dispatch]);

  let postArr = Object.values(posts);
  // console.log(postArr[0], "look here");
  // let postComments = Object.values(postArr[0]?.post_comments);
  // console.log(postComments, "over here you");
  // let postCommentArr = Object.values(post_comment);
  // console.log(post_comment, "over here is the comment state");

  console.log(postArr, "here is the array of posts");
  // console.log(postArr[0]?.post_comment);
  // const commentsArr = posts;
  // console.log(commentsArr, "here is the comments for the posts");

  return (
    <div className="post-page-container">
      <h1 className="post-title">
        Post your accomplishments, <br /> exercise questions, <br /> or anything
        on your mind!
      </h1>
      <hr className="line-break" />
      {user && (
        <div>
          <OpenModalButton
            className="create-post-button"
            buttonText="Create Post"
            onItemClick={closeMenu}
            modalComponent={<PostForm />}
          />
        </div>
      )}
      <div className="postDivs">
        {postArr?.map((post, idx) => (
          <div
            className="postCard"
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
            key={idx}
          >
            <div className="info-w-edit-button">
              <div
                className="info"
                onClick={() => {
                  navigate(`/posts/${post.id}`);
                }}
              >
                <h3 className="post-createdAt">{post.createdAt}</h3>
                <h1 className="name">
                  {post.name} | By {post.firstName} {post.lastName}
                </h1>

                <p className="post-description">{post.description}</p>
              </div>
              {/* {user?.id == post?.userId && (
                <div className="update-delete-post">
                  <div>
                    <OpenModalButton
                      className="edit-post-button"
                      buttonText="Edit Post"
                      onItemClick={closeMenu}
                      modalComponent={<UpdatePost id={post?.id} />}
                    />
                  </div>
                  <div>
                    <OpenModalButton
                      className="edit-post-button"
                      buttonText="Delete Post"
                      onItemClick={closeMenu}
                      modalComponent={<DeletePostButton post={post} />}
                    />
                  </div>
                </div>
              )} */}
            </div>
            {/* <div>{post?.post_comments?.description}</div>
            <div> here {Object.values(post?.post_comments[description])}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;

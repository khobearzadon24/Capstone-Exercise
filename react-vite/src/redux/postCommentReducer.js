// action type creator
const LOAD_ALL_POSTCOMMENTS = "post/loadAllPosts";
const ADD_POSTCOMMENT = "post/addPost";

//action creator
export const loadAllPostComments = (post_comments) => {
  return {
    type: LOAD_ALL_POSTCOMMENTS,
    post_comments,
  };
};

export const addPostComment = (post_comment) => {
  return {
    type: ADD_POSTCOMMENT,
    post_comment,
  };
};

// thunk action creator
export const fetchAllPostComments = () => async (dispatch) => {
  const response = await fetch("/api/post-comments");
  const post_comments = await response.json();
  dispatch(loadAllPostComments(post_comments));
};

export const writePostComment = (payload) => async (dispatch) => {
  const response = await fetch("/api/post-comments/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const post_comment = await response.json();
  if (response.status !== 201) {
    return post_comment;
  }
  if (response.ok) {
    dispatch(addPostComment(post_comment));
    return post_comment;
  }
};

// reducer
const postCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_POSTCOMMENTS: {
      const postCommentState = {};
      action.post_comments.post_comments.forEach((post_comment) => {
        postCommentState[post_comment.id] = post_comment;
      });
      return postCommentState;
    }
    case ADD_POSTCOMMENT:
      return { ...state, [action.post_comment.id]: action.post_comment };
    default:
      return state;
  }
};

export default postCommentReducer;

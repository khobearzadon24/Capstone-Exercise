// action type creator
const LOAD_POSTCOMMENTS = "postComment/loadAllPostComments";
const ADD_POSTCOMMENT = "postComment/addPostComment";

//action creator
export const loadPostComments = (post_comments) => {
  return {
    type: LOAD_POSTCOMMENTS,
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
  const response = await fetch(`/api/posts/${postId}/post-comments`);
  const post_comments = await response.json();
  dispatch(loadPostComments(post_comments));
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
    case LOAD_POSTCOMMENTS: {
      const postCommentState = {};
      action.post_comments?.forEach((post_comment) => {
        postCommentState[post_comment?.id] = post_comment;
      });
      return postCommentState;
    }
    case ADD_POSTCOMMENT:
      return { ...state, [action?.post_comment?.id]: action?.post_comment };
    default:
      return state;
  }
};

export default postCommentReducer;

// action type creator
const LOAD_POSTCOMMENTS = "postComment/loadPostComments";
const LOAD_POSTCOMMENT = "postComment/loadPostComment";
const ADD_POSTCOMMENT = "postComment/addPostComment";
const DELETE_POSTCOMMENT = "postComment/deletePostComment";
const UPDATE_POSTCOMMENT = "postComment/updatePostComment";
const LOAD_OWNER_POSTCOMMENTS = "postComment/loadOwnerPostComments";
const CLEAR_POSTCOMMENTS = "postComment/clearPostComments";

//action creator
//action creator
export const loadPostComments = (post_comments) => {
  return {
    type: LOAD_POSTCOMMENTS,
    post_comments,
  };
};

export const loadPostComment = (post_comment) => {
  return {
    type: LOAD_POSTCOMMENT,
    post_comment,
  };
};

export const addPostComment = (post_comment) => {
  return {
    type: ADD_POSTCOMMENT,
    post_comment,
  };
};

export const deletePostComment = (post_commentId) => {
  return {
    type: DELETE_POSTCOMMENT,
    post_commentId,
  };
};

export const loadOwnerPostComments = (post_comments) => {
  return {
    type: LOAD_OWNER_POSTCOMMENTS,
    post_comments,
  };
};

export const updatePostComment = (post_comment) => {
  return {
    type: UPDATE_POSTCOMMENT,
    post_comment,
  };
};

export const clearPostComments = () => {
  return {
    type: CLEAR_POSTCOMMENTS,
  };
};

// thunk action creator
export const fetchAllPostComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/post-comments`);
  const post_comments = await response.json();
  dispatch(loadPostComments(post_comments));
};

export const fetchPostComment = (postCommentId) => async (dispatch) => {
  const response = await fetch(`/api/post-comments/${postCommentId}`);
  const postComment = await response.json();
  console.log(postComment, "here is what comes out");
  dispatch(loadPostComment(postComment));
};

export const createPostComment = (payload, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}post-comments`, {
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

export const removePostComment = (post_commentId) => async (dispatch) => {
  const response = await fetch(`/api/post-comments/${post_commentId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const post_comment = await response.json();
    dispatch(deletePostComment(post_commentId));
    return post_comment;
  }
};

export const fetchOwnerPostComments = () => async (dispatch) => {
  const response = await fetch("/api/post-comments/current");

  if (response.ok) {
    const post_comments = await response.json();
    dispatch(loadOwnerPostComments(post_comments));
    return post_comments;
  }
};

export const editPostComment =
  (post_commentId, payload) => async (dispatch) => {
    const response = await fetch(`/api/post-comments/${post_commentId}`, {
      method: "PUT",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const post_comment = await response.json();
      dispatch(updatePostComment(payload));
      return post_comment;
    }
  };

// reducer
const postCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTCOMMENTS: {
      const postCommentState = {};
      action.post_comments.forEach((comment) => {
        postCommentState[comment.id] = comment;
      });
      return postCommentState;
    }
    case LOAD_POSTCOMMENT: {
      return {
        ...state,
        [action.post_comment.id]: action.post_comment,
      };
    }
    case ADD_POSTCOMMENT: {
      return {
        ...state,
        [action.post_comment?.id]: action.post_comment,
      };
    }
    case DELETE_POSTCOMMENT: {
      const newState = { ...state };
      delete newState[action?.post_commentId];
      return newState;
    }
    case LOAD_OWNER_POSTCOMMENTS: {
      const postCommentState = { ...state };
      action.post_comments.forEach((post_comment) => {
        postCommentState[post_comment.id] = post_comment;
      });
      return postCommentState;
    }
    case UPDATE_POSTCOMMENT:
      return {
        ...state,
        [action.post_comment.id]: action.post_comment,
      };
    case CLEAR_POSTCOMMENTS: {
      return {};
    }
    default:
      return state;
  }
};

export default postCommentReducer;

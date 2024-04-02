// action type creator
const LOAD_ALL_POSTS = "post/loadAllPosts";
const ADD_POST = "post/addPost";
const UPDATE_POST = "post/updatePost";
const LOAD_POST = "post/loadPost";

//action creator
export const loadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POSTS,
    posts,
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

export const updatePost = (post) => {
  return {
    type: UPDATE_POST,
    post,
  };
};

export const loadPost = (post) => {
  return {
    type: LOAD_POST,
    post,
  };
};

// thunk action creator
export const fetchAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");
  const posts = await response.json();
  dispatch(loadAllPosts(posts));
};

export const writePost = (payload) => async (dispatch) => {
  const response = await fetch("/api/posts/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const post = await response.json();
  if (response.status !== 201) {
    return post;
  }
  if (response.ok) {
    dispatch(addPost(post));
    return post;
  }
};

export const editPost = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(updatePost(payload));
    return post;
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/post/${postId}`);
  const post = await response.json();
  dispatch(loadPost(post));
};

//reducer
const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_POSTS: {
      const postState = {};
      action.posts.posts.forEach((post) => {
        postState[post.id] = post;
      });
      return postState;
    }
    case ADD_POST:
      return { ...state, [action.post.id]: action.post };
    case UPDATE_POST:
      return { ...state, [action.post.id]: action.post };
    case LOAD_POST:
      return { ...state, [action.post.id]: action.post };
    default:
      return state;
  }
};

export default postReducer;

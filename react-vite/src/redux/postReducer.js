// action type creator
const LOAD_ALL_POSTS = "post/loadAllPosts";
const ADD_POST = "post/addPost";
const UPDATE_POST = "post/updatePost";
const LOAD_POST = "post/loadPost";
const REMOVE_POST = "post/removePost";

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

export const removePost = (postId) => {
  return {
    type: REMOVE_POST,
    postId,
  };
};

// thunk action creator
export const fetchAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
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
    console.log(post);
    return post;
  }
  if (response.ok) {
    dispatch(addPost(post));
    console.log(post);
    return post;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(removePost(postId));
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
  } else {
    console.log("There was an error editing your post.");
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
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
    case REMOVE_POST: {
      const newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    case LOAD_POST:
      return { ...state, [action.post.id]: action.post };
    default:
      return state;
  }
};

export default postReducer;

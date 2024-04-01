// action type creator
const LOAD_EXERCISECOMMENTS = "exerciseComment/loadExerciseComments";
const LOAD_EXERCISECOMMENT = "exerciseComment/loadExerciseComment";
const ADD_EXERCISECOMMENT = "exerciseComment/addExerciseComment";
const DELETE_EXERCISECOMMENT = "exerciseComment/deleteExerciseComment";
const UPDATE_EXERCISECOMMENT = "exerciseComment/updateExerciseComment";
const LOAD_OWNER_EXERCISECOMMENTS = "exerciseComment/loadOwnerExerciseComments";

const CLEAR_EXERCISECOMMENTS = "exerciseComment/clearExerciseComments";

//action creator
export const loadExerciseComments = (exercise_comments) => {
  return {
    type: LOAD_EXERCISECOMMENTS,
    exercise_comments,
  };
};

export const loadExerciseComment = (exercise_comment) => {
  return {
    type: LOAD_EXERCISECOMMENT,
    exercise_comment,
  };
};

export const addExerciseComment = (exercise_comment) => {
  return {
    type: ADD_EXERCISECOMMENT,
    exercise_comment,
  };
};

export const deleteExerciseComment = (exercise_commentId) => {
  return {
    type: DELETE_EXERCISECOMMENT,
    exercise_commentId,
  };
};

export const loadOwnerExerciseComments = (exercise_comments) => {
  return {
    type: LOAD_OWNER_EXERCISECOMMENTS,
    exercise_comments,
  };
};

export const updateExerciseComment = (exercise_comment) => {
  return {
    type: UPDATE_EXERCISECOMMENT,
    exercise_comment,
  };
};

export const clearExerciseComments = () => {
  return {
    type: CLEAR_EXERCISECOMMENTS,
  };
};

//thunk action creators
export const fetchAllExerciseComments = (exerciseId) => async (dispatch) => {
  const response = await fetch(
    `/api/exercises/${exerciseId}/exercise-comments`
  );
  const exerciseComments = await response.json();
  dispatch(loadExerciseComments(exerciseComments));
};

export const fetchExerciseComment = (exerciseCommentId) => async (dispatch) => {
  const response = await fetch(`/api/exercise-comments/${exerciseCommentId}`);
  const exerciseComment = await response.json();
  dispatch(loadExerciseComment(exerciseComment));
};

export const createExerciseComment =
  (payload, exerciseId) => async (dispatch) => {
    const response = await fetch(
      `/api/exercises/${exerciseId}/exercise-comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const exercise_comment = await response.json();
    if (response.status !== 201) {
      return exercise_comment;
    }
    if (response.ok) {
      dispatch(addExerciseComment(exercise_comment));
      return exercise_comment;
    }
  };

export const removeExerciseComment =
  (exercise_commentId) => async (dispatch) => {
    const response = await fetch(
      `/api/exercise-comments/${exercise_commentId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const exercise_comment = await response.json();
      dispatch(deleteExerciseComment(exercise_commentId));
      return exercise_comment;
    }
  };

export const fetchOwnerExerciseComments = () => async (dispatch) => {
  const response = await fetch("/api/exercise-comments/current");

  if (response.ok) {
    const exercise_comments = await response.json();
    dispatch(loadOwnerExerciseComments(exercise_comments));
    return exercise_comments;
  }
};

export const editExerciseComment =
  (exercise_commentId, payload) => async (dispatch) => {
    const response = await fetch(
      `/api/exercise-comments/${exercise_commentId}`,
      {
        method: "PUT",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      const exercise_comment = await response.json();
      dispatch(updateExerciseComment(payload));
      return exercise_comment;
    }
  };

//selectors if needed

//reducer
const exerciseCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EXERCISECOMMENTS: {
      const exerciseCommentState = { ...state };
      action.exercise_comment.Exercise_Comment.forEach((exercise_comment) => {
        exerciseCommentState[exercise_comment.id] = exercise_comment;
      });
      return exerciseCommentState;
    }
    case ADD_EXERCISECOMMENT: {
      return {
        ...state,
        [action.exercise_comment?.id]: action.exercise_comment,
      };
    }
    case DELETE_EXERCISECOMMENT: {
      const newState = { ...state };
      delete newState[action.exercise_commentId];
      return newState;
    }
    case LOAD_OWNER_EXERCISECOMMENTS: {
      const exerciseCommentState = { ...state };
      action.exercise_comments.forEach((exercise_comment) => {
        exerciseCommentState[exercise_comment.id] = exercise_comment;
      });
      return exerciseCommentState;
    }
    case UPDATE_EXERCISECOMMENT:
      return { ...state, [action.exercise.id]: action.exercise };
    case CLEAR_EXERCISECOMMENTS: {
      return {};
    }
    default:
      return state;
  }
};

export default exerciseCommentReducer;

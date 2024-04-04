// action type creator
const LOAD_EXERCISE_TYPES = "exercise/loadTypes";
const LOAD_EXERCISE = "exercise/loadExercise";
const LOAD_ALL_EXERCISES = "exercise/loadAllExercises";
const LOAD_OWNER_EXERCISES = "exercise/ownerExercises";
const ADD_EXERCISE = "exercise/addExercise";
const REMOVE_EXERCISE = "exercise/removeExercise";
const UPDATE_EXERCISE = "exercise/updateExercise";
const CLEAR_EXERCISES = "exercise/clearExercises";

//action creator
export const loadExerciseTypes = (exerciseTypes) => {
  return {
    type: LOAD_EXERCISE_TYPES,
    exerciseTypes,
  };
};

export const loadExercise = (exercise) => {
  return {
    type: LOAD_EXERCISE,
    exercise,
  };
};

export const loadAllExercises = (exercises) => {
  return {
    type: LOAD_ALL_EXERCISES,
    exercises,
    //payload
  };
};

export const loadOwnerExercises = (exercises) => {
  return {
    type: LOAD_OWNER_EXERCISES,
    exercises,
  };
};

export const addExercise = (exercise) => {
  return {
    type: ADD_EXERCISE,
    exercise,
  };
};

export const removeExercise = (exerciseId) => {
  return {
    type: REMOVE_EXERCISE,
    exerciseId,
  };
};

export const updateExercise = (exercise) => {
  return {
    type: UPDATE_EXERCISE,
    exercise,
  };
};

export const clearExercises = () => {
  return {
    type: CLEAR_EXERCISES,
  };
};

// thunk action creator
export const getExerciseTypes = () => async (dispatch) => {
  const response = await fetch(`/api/exercises/types`);
  const exerciseTypes = await response.json();
  dispatch(loadExerciseTypes(exerciseTypes));
};

export const fetchExercise = (exerciseId) => async (dispatch) => {
  const response = await fetch(`/api/exercises/${exerciseId}`);
  const exercise = await response.json();
  dispatch(loadExercise(exercise));
};

export const fetchAllExercises = () => async (dispatch) => {
  const response = await fetch("/api/exercises/");
  const exercises = await response.json();
  dispatch(loadAllExercises(exercises));
};

export const fetchOwnerExercises = () => async (dispatch) => {
  const response = await fetch(`/api/exercises/current`);
  const exercises = await response.json();
  dispatch(loadOwnerExercises(exercises));
};

export const writeExercise = (payload) => async (dispatch) => {
  const response = await fetch("/api/exercises/", {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(payload),
    body: payload,
  });
  console.log(response, "here is the response");
  // const exercise = await response.json();
  const resPost = await response.json();
  console.log(resPost);
  if (response.ok) {
    const newExer = await dispatch(addExercise(resPost));
    return newExer;
  } else {
    return console.log(resPost, "There was an error making your post");
  }
};

export const deleteExercise = (exerciseId) => async (dispatch) => {
  const response = await fetch(`/api/exercises/${exerciseId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const exercise = await response.json();
    dispatch(removeExercise(exerciseId));
    return exercise;
  }
};

export const editExercise = (exerciseId, payload) => async (dispatch) => {
  const response = await fetch(`/api/exercises/${exerciseId}`, {
    method: "PUT",
    // header: { "Content-Type": "application/json" },
    // body: JSON.stringify(payload),
    body: payload,
  });
  if (response.ok) {
    const { exercise } = await response.json();
    dispatch(updateExercise(exercise));
  } else {
    console.log("There was an error editing yout post.");
  }
};

//selectors if needed

// reducer
const exerciseReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_EXERCISE_TYPES:
      return { ...state, ["types"]: action.exerciseTypes };
    case LOAD_EXERCISE:
      return { ...state, [action.exercise.id]: action.exercise };
    case LOAD_ALL_EXERCISES: {
      const exerciseState = {};
      action.exercises.exercises.forEach((exercise) => {
        exerciseState[exercise.id] = exercise;
      });
      return exerciseState;
    }
    case LOAD_OWNER_EXERCISES: {
      const exerciseState = {};
      action.exercises.exercises.forEach((exercise) => {
        exerciseState[exercise.id] = exercise;
      });
      return exerciseState;
    }
    case ADD_EXERCISE: {
      const exerciseState = { ...state };
      // console.log(action.exercise, "OVER HERE");
      exerciseState[action.exercise.id] = action.exercise;
      return exerciseState;
    }
    case REMOVE_EXERCISE: {
      const newState = { ...state };
      delete newState[action.exerciseId];
      return newState;
    }
    case UPDATE_EXERCISE:
      return { ...state, [action.exercise.id]: action.exercise };
    case CLEAR_EXERCISES:
      return {};
    default:
      return state;
  }
};
export default exerciseReducer;

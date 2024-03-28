import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import exerciseReducer from "./exerciseReducer";
import exerciseCommentReducer from "./exerciseCommentReducer";
import postReducer from "./postReducer";
import postCommentReducer from "./postCommentReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  exerciseState: exerciseReducer,
  exerciseCommentState: exerciseCommentReducer,
  postState: postReducer,
  postCommentState: postCommentReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

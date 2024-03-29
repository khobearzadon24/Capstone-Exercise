import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllExerciseComments } from "../../redux/exerciseCommentReducer";

function PostPage() {
  console.log("this is the post page");
  return (
    <>
      <h1>This is the Post Page</h1>
    </>
  );
}

export default PostPage;

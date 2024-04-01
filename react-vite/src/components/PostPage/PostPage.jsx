import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { fetchAllPosts } from "../../redux/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllPostComments } from "../../redux/postCommentReducer";

function PostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <h1>This is the Post Page</h1>
    </>
  );
}

export default PostPage;

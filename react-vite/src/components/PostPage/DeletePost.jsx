import { useDispatch } from "react-redux";
import { fetchAllPosts, deletePost } from "../../redux/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

function DeletePostButton({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const removePost = async (e) => {
    e.preventDefault();
    // closeModal();
    await dispatch(deletePost(id));
    await navigate("/posts");
  };

  return (
    <button
      className="delete-exercise-button"
      onClick={(e) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
          removePost(e);
        }
      }}
    >
      Delete Post
    </button>
  );
}

export default DeletePostButton;

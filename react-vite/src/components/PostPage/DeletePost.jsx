import { useDispatch } from "react-redux";
import { fetchAllPosts, deletePost } from "../../redux/postReducer";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

function DeletePostButton({ post }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(post?.id));
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1 className="confirm-delete">Confirm Delete</h1>
      <p className="you-sure">Are you sure you want to delete this post?</p>
      <div className="yes-no">
        <button className="yes-delete" onClick={deleteSubmit}>
          Yes Delete Post
        </button>
        <button className="yes-delete" onClick={closeModal}>
          No Keep Post
        </button>
      </div>
    </div>
  );
}

export default DeletePostButton;

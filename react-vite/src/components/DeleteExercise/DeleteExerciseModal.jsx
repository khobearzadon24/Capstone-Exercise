import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeExercise } from "../../redux/exerciseReducer";
import "./DeleteExerciseModal.css";

function DeleteExerciseModal({ exercise }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // console.log(exercise, "here is the exercise over here");

  const deleteSubmit = async (e) => {
    e.preventDefault();
    await dispatch(removeExercise(exercise?.id));
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1 className="confirm-delete">Confirm Delete</h1>
      <p className="you-sure">Are you sure you want to delete this exercise?</p>
      <div className="yes-no">
        <button className="yes-delete" onClick={deleteSubmit}>
          Yes Delete Exercise
        </button>
        <button className="yes-delete" onClick={closeModal}>
          No Keep Exercise
        </button>
      </div>
    </div>
  );
}

export default DeleteExerciseModal;

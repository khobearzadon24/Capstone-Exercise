import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeExercise } from "../../redux/exerciseReducer";

function DeleteExerciseModal({ exercise, renderExercise }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // console.log(spot, "here is the spot over hererere");

  const deleteSubmit = async (e) => {
    e.preventDefault();
    await dispatch(removeExercise(exercise.id));
    renderSpot();
    closeModal();
  };

  return (
    <div className="delete-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this exercise?</p>
      <div className="yes-no">
        <button onClick={deleteSubmit}>Yes Delete Exercise</button>
        <button onClick={closeModal}>No Keep Exercise</button>
      </div>
    </div>
  );
}

export default DeleteExerciseModal;

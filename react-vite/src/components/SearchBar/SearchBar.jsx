import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { fetchAllRestaurants, getRestaurantTypes } from "../../redux/restaurantReducer";
import {
  fetchAllExercises,
  getExerciseTypes,
} from "../../redux/exerciseReducer";
import { useEffect, useState } from "react";
import React from "react";
import "./SearchBar.css";
// import { useSearch } from "../../context/SearchContext";
// import { useTopModal } from "../../context/TopModal";
// import SearchModal from "./SearchModal";

function SearchBar({ setResults }) {
  const dispatch = useDispatch();
  const { input, setInput } = useState("");
  //   const { setModalContent } = useTopModal();
  const exercises = useSelector((state) => state.exerciseState);
  //   const exerciseTypes = exercises?.types;
  const exerciseArr = Object.values(exercises);

  const findResults = () => {
    if (input) {
      setInput([]);
      const res = exerciseArr.filter((exercise) =>
        exercise?.name?.toLowerCase().includes(input?.toLowerCase())
      );
      setResults(res);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    exercises(value);
  };
  //   useEffect(() => {
  //     setInput([]);
  //     findResults();
  //   }, [input]);

  useEffect(() => {
    dispatch(fetchAllExercises());
  }, [dispatch]);

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

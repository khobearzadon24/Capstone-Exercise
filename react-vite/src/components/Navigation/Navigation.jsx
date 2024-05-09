import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaSearch } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CommonTerms from "../CommonTerms/CommonTerms";
import Calculator from "../Calculator/Calculator";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const handleFeature = () => {
    alert("Feature Coming Soon");
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <div className="nav-bar">
      <NavLink className="home-button" to="/">
        Show Up Show Out
      </NavLink>

      <div className="exercise-post-buttons">
        <NavLink className="exercise-page" to="/exercises">
          Exercises
        </NavLink>
        <NavLink className="post-page" to="/posts">
          Posts
        </NavLink>
      </div>
      <div className="right-side-nav">
        <div className="common-calc">
          <OpenModalButton
            className="common-terms"
            buttonText="Common Terms"
            onItemClick={closeMenu}
            modalComponent={<CommonTerms />}
          />
          <OpenModalButton
            className="common-terms"
            buttonText="Calculator"
            onItemClick={closeMenu}
            modalComponent={<Calculator />}
          />
        </div>
        <div className="search-bar" onClick={(e) => handleFeature(e)}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            name="search-bar"
            placeholder="Search for an exercise"
          />
        </div>
        <div className="profile-button-area">
          <ProfileButton className="profile-button" />
        </div>
      </div>
    </div>
  );
}

export default Navigation;

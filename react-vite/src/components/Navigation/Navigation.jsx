import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaSearch } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CommonTerms from "../CommonTerms/CommonTerms";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const handleFeature = (e) => {
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
      <div>
        <NavLink className="home-button" to="/">
          Show Up Show Out
        </NavLink>
      </div>
      <div className="exercise-post-buttons">
        <NavLink className="exercise-page" to="/exercises">
          Exercises
        </NavLink>
        <NavLink className="post-page" to="/posts">
          Posts
        </NavLink>
      </div>
      <div className="right-side-nav">
        <div>
          <OpenModalButton
            className="common-terms"
            buttonText="Common Terms"
            onItemClick={closeMenu}
            modalComponent={<CommonTerms />}
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
        <ul>
          <ProfileButton className="profile-button" />
        </ul>
      </div>
    </div>
  );
}

export default Navigation;

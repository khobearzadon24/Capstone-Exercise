import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaSearch } from "react-icons/fa";

function Navigation() {
  const handleFeature = (e) => {
    alert("Feature Coming Soon");
  };
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

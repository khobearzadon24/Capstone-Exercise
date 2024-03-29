import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar">
      <NavLink className="home-button" to="/">
        Show Up Show Out
      </NavLink>

      <NavLink className="exercise-page" to="/exercises">
        Exercises
      </NavLink>

      <NavLink className="post-page" to="/exercises">
        Posts
      </NavLink>

      <div className="">
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;

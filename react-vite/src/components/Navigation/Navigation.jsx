import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar">
      <div>
        <NavLink className="home-button" to="/">
          Show Up Show Out
        </NavLink>
      </div>
      <div className="exercise-post">
        <NavLink className="exercise-page" to="/exercises">
          Exercises
        </NavLink>

        <NavLink className="post-page" to="/posts">
          Posts
        </NavLink>
      </div>

      <ul className="">
        <ProfileButton />
      </ul>
    </div>
  );
}

export default Navigation;

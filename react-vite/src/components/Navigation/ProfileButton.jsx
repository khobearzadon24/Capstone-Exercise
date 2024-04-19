import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate, NavLink } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout()).then(navigate("/"));
    // closeMenu();
  };

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={toggleMenu}>
        <FaUserCircle className="profile-logo" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li className="profile-text">
                {user.firstName} {user.lastName}
              </li>
              <li className="profile-text">{user.email}</li>
              <li className="profile-text">
                <NavLink
                  className="profile-text-exercises"
                  to="/exercises/my-exercises"
                >
                  My Exercises
                </NavLink>
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/exercises/my-exercises`);
                  }}
                >
                  My Exercises
                </button> */}
              </li>
              <li>
                <button className="log-out-button" onClick={logout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                className="login-signup"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                className="login-signup"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;

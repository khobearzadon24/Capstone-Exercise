import { NavLink } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="first-container">
        <div className="exercise-text">
          <h2>Why Exercise?</h2>
          <h3>
            Exercising is a great and important way of making sure that you are
            getting the regular amount of physical activity your body needs.
            Being physically active can improve your brain health, help manage
            weight, reduce the risk of disease, strengthen bones and muscles,
            and improve your ability to do everday activities.
          </h3>
        </div>
        <div className="exercise-image-cont">
          <img
            className="exercise-image"
            src="https://i.postimg.cc/GtwY4HZK/db-bench-press.jpg"
            alt="exercise"
          />
        </div>
      </div>
      <div className="first-container">
        <div className="exercise-text">
          <h2>About Us</h2>
          <h3>
            You have visited just the right place to get your mind and body
            right for your fitness journey! Explore the website and you will see
            why! Have fun
          </h3>
        </div>
        <div>
          <img
            className="exercise-image"
            src="https://i.postimg.cc/GtwY4HZK/db-bench-press.jpg"
            alt="exercise"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="first-container">
        <div className="exercise-text">
          <h2 className="landing-page-title">Why Exercise?</h2>
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
            className="exercise-image-landing"
            src="https://i.postimg.cc/NMSv2ygB/show-up-mickey.jpg"
            alt="why-exercise"
          />
        </div>
      </div>
      <div className="first-container">
        <div>
          <img
            className="exercise-image-landing"
            src="https://i.postimg.cc/rpQPnZ8x/mickey-and-gang.jpg"
            alt="about-us"
          />
        </div>
        <div className="exercise-text">
          <h2 className="landing-page-title">About Us</h2>
          <h3>
            You have visited just the right place to get your mind and body
            right for your fitness journey! Our website will allow you to gain a
            vast amount of exercise knowledge from other users and you can also
            give your opinions on the exercises they decide to share. You may
            also even post your own accomplishments and see what others have
            accomplished in their own journeys.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

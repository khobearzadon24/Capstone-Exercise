import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../redux/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors({});
    const demoUser = {};
    demoUser.email = "googlybear@hotmail.com";
    demoUser.password = "scarymonster564";
    return dispatch(sessionActions.thunkLogin(demoUser))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="container-of-log-in">
      <h1 className="log-in-modal-title">Log In</h1>
      <form className="log-in-modal-form" onSubmit={handleSubmit}>
        <label className="enter-email">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="login-errors">{errors.email}</p>}
        <label className="enter-password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="login-errors">{errors.password}</p>}
        <button className="log-in-modal-button" type="submit">
          Log In
        </button>
        <button className="demo-user" onClick={handleDemo}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;

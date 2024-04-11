import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div>
        Khobe Arzadon
        <Link to="https://github.com/khobearzadon24" target="_blank">
          <FaGithub />
        </Link>
        <Link
          to="https://www.linkedin.com/in/khobe-arzadon-4b985a202/"
          target="_blank"
        >
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
}

export default Footer;

import 'animate.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container wrapper">
        <FontAwesomeIcon
          className="footer-paw-icon"
          icon={faPaw} />
        <p className="animate__animated animate__fadeInUp">Made by <a href="https://borisweb.dev">Boris Ulanowicz</a> for <a href="https://corvum.io/">Corvum</a> - July 2021. API: <a href="https://dog.ceo/dog-api/">DOG CEO's Dog API.</a></p>
      </div>
    </div>
  )
}
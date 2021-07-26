import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import 'animate.css';

import Form from './Form';

export default function Nav(props) {
  const { inputHandler, allBreedsArr, currentBreed } = props;

  return (
    <div className="nav animate__animated animate__fadeInDown">
      <div className="nav-container wrapper">
        <p>wagfinder - explore the world of dogs</p>
        <Form
          currentBreed={currentBreed}
          inputHandler={inputHandler}
          allBreedsArr={allBreedsArr} />
        <nav>
          <label htmlFor="toggle" className="hamburger-toggle">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <input type="checkbox" id="toggle" name="toggle" />
          <ul className="sliding-menu">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Cats</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
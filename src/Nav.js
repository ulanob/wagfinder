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
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Cats</a></li>
          </ul>
        </nav>
      </div>
    </div >
  )
}
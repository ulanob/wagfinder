import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";


export default function ExampleDog(props) {
  const { changeExample, exampleDog, toGallery } = props;

  return (
    <div>
      <div className='example-dog-container'>
        <FontAwesomeIcon
          className='arrow side-arrow'
          onClick={() => changeExample('prev')}
          icon={faChevronLeft} />
        <img
          src={exampleDog}
          alt="four legged best friend" />
        <FontAwesomeIcon
          className='arrow side-arrow'
          onClick={() => changeExample('next')}
          icon={faChevronRight} />
      </div>
      <p>visit the gallery below!</p>
      <FontAwesomeIcon
        className='arrow get-gallery-button clearfix'
        onClick={() => toGallery()}
        icon={faChevronDown} />
    </div>
  )
}
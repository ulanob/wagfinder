import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";


export default function DogGallery(props) {
  const { paginationObj, handleCurrentPage, currentPage, toTop } = props;

  const middle = paginationObj.displayPhotos.length / 2;
  const end = paginationObj.displayPhotos.length;
  const galleryRight = [...paginationObj.displayPhotos].splice(0, middle);
  const galleryLeft = [...paginationObj.displayPhotos].splice(middle + 1, end);

  const addStyles = (val) => {
    if (val === currentPage) {
      return "button-highlight"
    }
  }

  return (
    <div className="gallery-container">
      <div className="button-container">
        {
          currentPage > 2 ?
            <button onClick={(e) => { handleCurrentPage(0, e) }}>1</button> : null
        }
        {
          // window.pageYOffset > 100 ?
          paginationObj.displayButtons.map((button) => {
            const addClassStr = addStyles(button);
            return (
              <button
                className={addClassStr}
                val={button}
                key={button}
                onClick={(e) => { handleCurrentPage(button, e) }}
              >{button + 1}</button>
            )
          })
        }
        {
          currentPage < paginationObj.numberOfPages - 4 ?
            <button
              val={paginationObj.numberOfPages - 1}
              onClick={(e) => { handleCurrentPage(paginationObj.numberOfPages - 1, e) }}>{paginationObj.numberOfPages}</button> : null
        }
      </div>
      <div className="gallery-divider wrapper">

        <div className="gallery-half first-half">
          {
            galleryRight.map((photo, i) => {
              return (
                <img key={'first' + i} src={photo} alt="more good boys" />
              )
            })
          }

        </div>
        <div className="paws"></div>
        {
          galleryLeft ?
            <div className="gallery-half second-half">
              {
                galleryLeft.map((photo, i) => {
                  return (
                    <img key={'second' + i} src={photo} alt="more good boys" />
                  )
                })
              }
            </div> : null
        }
      </div>
      <div className="icon-container">
        <FontAwesomeIcon
          className='to-top-button'
          onClick={() => toTop()}
          icon={faChevronUp} />
      </div>
    </div>
  )
}

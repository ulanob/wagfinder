import './sass/styles.scss';
import axios from 'axios';
import 'animate.css';

import { useEffect, useState, useRef } from 'react';
import Nav from './Nav.js';
import ExampleDog from './ExampleDog';
import DogGallery from './DogGallery';
import Greeting from './Greeting';
import Footer from './Footer';


function App() {
  const [allBreeds, setAllBreeds] = useState({});
  const [allBreedsArr, setAllBreedsArr] = useState([]);
  const [currentBreed, setCurrentBreed] = useState([]);
  const [exampleDog, setExampleDog] = useState([]);
  const [dogGallery, setDogGallery] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationObj, setPaginationObj] = useState({});

  const galleryRef = useRef();


  // get list of breeds
  useEffect(() => {
    apiCall('list');
  }, [])

  // convert list of breeds obj to array, set to state
  useEffect(() => {
    setAllBreedsArr(Object.keys(allBreeds));
  }, [allBreeds])

  // api calls for exampleDog & gallery images of currentBreed
  useEffect(() => {
    if (allBreedsArr.indexOf(currentBreed) > -1) {
      apiCall('random', currentBreed);
      apiCall('breedAll', currentBreed)
    }
  }, [currentBreed])

  // pagination
  useEffect(() => {
    if (dogGallery) {
      const pagination = { ...paginationObj };

      pagination.numberOfPages = Math.ceil(dogGallery.length / itemsPerPage);
      pagination.buttonValArr = []
      for (let i = 0; i < pagination.numberOfPages; i++) {
        pagination.buttonValArr.push(i);
      }
      pagination.displayButtons = [];
      if (currentPage < 3) {
        pagination.displayButtons = pagination.buttonValArr.slice(0, 5);
      } else if (currentPage >= pagination.buttonValArr.length - 4) {
        pagination.displayButtons = pagination.buttonValArr.slice(pagination.buttonValArr.length - 5, pagination.buttonValArr.length);
      } else {
        pagination.displayButtons = pagination.buttonValArr.slice(currentPage - 2, currentPage + 3);
      }
      pagination.displayPhotos = [];
      const start = currentPage * itemsPerPage;
      const end = currentPage * itemsPerPage + itemsPerPage + 1;
      pagination.displayPhotos = dogGallery.slice(start, end);

      setPaginationObj(pagination);
    }
  }, [dogGallery, currentPage])


  const apiCall = (callType, breed) => {
    // req for a list of all breeds
    if (callType === 'list') {
      const apiUrl = 'https://dog.ceo/api/breeds/list/all';
      axios.get(apiUrl).then((res) => {
        setAllBreeds(res.data.message);
      });
      //  req for random pic of specific breed
    } else if (callType === 'random') {
      const apiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
      axios.get(apiUrl).then((res) => {
        setExampleDog(res.data.message);
      });
      //  req for all pics of specific breed
    } else if (callType === 'breedAll') {
      const apiUrl = `https://dog.ceo/api/breed/${breed}/images`;
      axios.get(apiUrl).then((res) => {
        setDogGallery(res.data.message);
      });
    }
  }

  const inputHandler = (e) => {
    e.preventDefault();
    setCurrentBreed(e.target.value);
  }

  // moving stepwise through array
  const changeExample = (dir) => {
    let ind = allBreedsArr.indexOf(currentBreed);
    if (dir === 'prev' && ind - 1 > -1) {
      ind = ind - 1;
    } else if (dir === 'prev' && ind === 0) {
      ind = allBreedsArr.length - 1
    } else if (dir === 'next' && ind + 1 < allBreedsArr.length) {
      ind = ind + 1;
    } else if (dir === 'next' && ind + 1 === allBreedsArr.length) {
      ind = 0;
    }
    setCurrentBreed(allBreedsArr[ind]);
    setDogGallery([]);
    setCurrentPage(0);
  }

  const toGallery = () => {
    galleryRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const toTop = () => {
    window.scrollTo(0, 'smooth');
  }

  const handleCurrentPage = (val, e) => {
    e.preventDefault();
    setCurrentPage(val);
    galleryRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  // const prevNextFirstLast = (val, e) => {
  //   e.preventDefault();
  //   if (val === "prev" && currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //   } else if (val === "next" && currentPage < paginationObj.numberOfPages - 1) {
  //     setCurrentPage(currentPage + 1)
  //   } else if (val === "first") {
  //     setCurrentPage(0)
  //   } else if (val === "last") {
  //     setCurrentPage(paginationObj.numberOfPages - 1)
  //   }
  // }


  return (
    <div className="App">
      <Nav
        inputHandler={inputHandler}
        allBreedsArr={allBreedsArr}
        currentBreed={currentBreed} />
      <div className="header-under-nav">
        <div className='header-box animate__animated animate__fadeIn'>
          {
            currentBreed.length > 0 ?
              <ExampleDog
                currentBreed={currentBreed}
                changeExample={changeExample}
                exampleDog={exampleDog}
                toGallery={toGallery}
                allBreedsArr={allBreedsArr}
                inputHandler={inputHandler} />
              : <Greeting />
          }
        </div>
      </div>
      <div ref={galleryRef} className="gallery">
        {
          dogGallery.length > 0 ?
            <DogGallery
              handleCurrentPage={handleCurrentPage}
              currentPage={currentPage}
              paginationObj={paginationObj}
              toTop={toTop} />
            : null
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;

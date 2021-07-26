const Form = (props) => {
  const { inputHandler, allBreedsArr, currentBreed } = props;

  return (
    <form action="submit" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="breed-dropdown"></label>
      <select
        name="breed-dropdown" id="breed-dropdown"
        onChange={(e) => inputHandler(e)}>
        <option>Select Breed</option>
        {
          allBreedsArr.map((breedName, i) => {
            return (
              breedName === currentBreed ?
                <option value={breedName} key={i} selected>{breedName}</option> :
                <option value={breedName} key={i}>{breedName}</option>
            )
          })
        }
      </select>
    </form>
  )
}

export default Form;


{/* 
  <label htmlFor="search"></label>
  <input list="breed-list" type="text" name="search" id="search" onChange={(e) => inputHandler("search", e.target.value, e)} />
      <datalist id="breed-list">
        {
          filteredBreeds.map((breedName, i) => {
            return (
              <option value={breedName} key={i}>{breedName}</option>
            )
          })
        }
      </datalist> */}
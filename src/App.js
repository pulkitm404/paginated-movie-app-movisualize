import React, { useState } from 'react'
import axios from 'axios'

import {Pagination} from './components/Pagination'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(3);
  const [pageNav, setPageNav] = useState(false);


  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "https://omdbapi.com/?apikey=dfe6d885";

  const search = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
      setLoading(false);
      setPageNav(true);
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }


  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = state.results.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate =(pageNumber) =>setCurrentPage(pageNumber);

  const prepage =() =>{ 
    if(currentPage===1);
    else
      setCurrentPage(currentPage-1);
  }

  const nextpage =() =>{
    if(currentPage===Math.ceil(state.results.length / moviesPerPage));
    else
    setCurrentPage(currentPage+1);
  }

  return (
    <div className="App">
      <header>
        <h1>Movisualize</h1><Search handleInput={handleInput} search={search} />
      </header>
      <main>
        

        <Results results={currentMovies} loading={loading} openPopup={openPopup} />
        { pageNav ? <Pagination 
        moviesPerPage={moviesPerPage}
        totalMovies={state.results.length} 
        paginate={paginate}
        prepage={prepage}
        nextpage={nextpage}
        /> : null}
        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App

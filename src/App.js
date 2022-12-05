import { useEffect, useState } from "react";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  // state to hold the movie data
  const [movie, setMovie] = useState(null);
  const [moviePages, setMoviePages] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [search, setSearch] = useState(null)
  const [searchPages, setSearchPages] = useState(1)
  const [inputText, setInputText] = useState(null)
  const [searchTotalPages, setSearchTotalPages] = useState(null)
  const [category, setCategory] = useState('popular')


  //runs as soon as the App component gets rendered
  useEffect(() => {
    getMovie()
    searchMovie(inputText)
  }, [moviePages, searchPages, category])

  // Function to fetch movie data
  const getMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=73292f14bbc5ffbeba081ce1f4c3d730&language=en-US&page=${moviePages}`
      );
      const data = await res.json();
      setMovie(data); // set the data into our state
      setLastPage(data.total_pages)
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovie = async (title) => { 
    if(title === null) return
    try {
      const res = await fetch (
        `https://api.themoviedb.org/3/search/movie?api_key=73292f14bbc5ffbeba081ce1f4c3d730&language=en-US&query=${title}&page=${searchPages}&include_adult=false`
      )
      const data = await res.json()
      setSearch(data.results)
      setSearchTotalPages(data.total_pages)
      console.log(data);
    }catch(error) {
      console.log(error);
    }
  }
  const navigateToCategory = (text) => {
    setCategory(text)
  }
  const buttonText = ['popular', 'upcoming', 'now playing', 'top rated']
  console.log(category);
  return (
  <div>
    <nav>
      <div className="nav-btn-container">
        {
          buttonText.map(text => {
            let newText = text.replace(' ', '_')
            return <button className="nav-btn" onClick={() => navigateToCategory(newText)} style={{color: category === newText ? 'black' : 'white'}} key={text}>{text}</button>
          })
        }
      </div>
      <Form movieSearch={searchMovie} getSearch={(data) => setInputText(data)}/>
    </nav>

    <div className="app-container"> 
    {
      search === null ? null: 
      <>
        <Pagination pages={searchPages} setPages={setSearchPages} totalPages={searchTotalPages} title={'Search Results'}/>
        <div className="movie-container">
          {search?.map(search => <MovieDisplay key={search.id} movie={search} />)}
        </div>
      </>
    }
    {
      search !== null ? null:
      <>
        <Pagination pages={moviePages} setPages={setMoviePages} totalPages={searchTotalPages} title={`${category} movies`} />  
        <div className="movie-container">
          {movie && movie.results.map(movie => <MovieDisplay key={movie.id} movie={movie} />)}
        </div>
      </>
    }
    </div>
  </div>
  );
}

export default App;














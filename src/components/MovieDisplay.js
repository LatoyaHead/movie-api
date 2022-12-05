const Image = ({img}) => {
  return (
    img === null ?
    <div style={{width: 200, height: 300, backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h2>No Image Available</h2>
    </div> : 
    <img src={`https://image.tmdb.org/t/p/w200${img}`} alt="movie-poster" />
  )
}
const MovieDisplay = (props) => {
  const {movie} = props;
  return(
    <div style={{width: 200}}>
      <Image img={movie.poster_path}/>
      <h2>{movie.title}</h2>
      <h4>{movie.release_date}</h4>
    </div>
  )
}

export default MovieDisplay;
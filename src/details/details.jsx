import React from "react";
import Ratings from "./ratings";

function Details(props) {

  const genresFormat = () => {
    const genres = [];
    props.movie?.details.genres.forEach(genre => {
      genres.push(genre.name);
    })
    return genres.join(', ');
  }
  const close = (e) => {
    props.hideDetails();
  }
  const favoriteState = React.useCallback((movieId) => {
    const index = props.favorites?.findIndex(movie => {
      return movie.id === Number(movieId)
    });
    if (index >= 0) {
      return "fa-solid fa-heart";
    } else {
      return "fa-regular fa-heart";
    }
  }, [props]);
  const toggleFavorite = (e) => {
    props.toggleFavorite(props.movie.id)
  }
  if (props.show) {
    return (
      <article className={props.className} style={{ backgroundImage: `https://image.tmdb.org/t/p/w780${props.movie.backdrop}` }}>
        <h3 className="text-3xl font-semibold text-white p-2">{props.movie.title}</h3>
        <section className="grid grid-cols-3 gap-4 backdrop-blur-md shadow-lg border-slate-700 border-solid border rounded-lg p-2">
          <figure><img src={`https://image.tmdb.org/t/p/w342${props.movie.poster}`} alt={props.movie.title} className="border-slate-700 border-solid border rounded-lg" /></figure>
          <section className="container">
            <h2> {props.movie.tagline} </h2>
            <ul>
              <li>Released: {props.movie.release_date}</li>
              <li>Runtime: {props.movie.runtime} minutes</li>
              <li>Revenue: ${props.movie.revenue.toLocaleString()} </li>
              <li>Genres: {`${genresFormat()}`}</li>
              <br />
              <hr />
              <br />
              <li> {props.movie.details.overview} </li>
              <li className="flex space-x-4 m-4 justify-center"> <a href={`https://www.imdb.com/title/${props.movie.imdb_id}`} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-imdb text-5xl"></i></a>
                <a href={`https://www.themoviedb.org/movie/${props.movie.tmdb_id}`} target="_blank" rel="noopener noreferrer"><img src="/images/tmdb.svg" alt="TMDB" width="45" className="invert" /></a></li>
              <hr />
              <br />
            </ul>
            <Ratings ratings={props.movie.ratings} ratingsUpdate={props.ratingsUpdate}></Ratings>
          </section>
          <span className="flex flex-col basis-1"><button className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" onClick={close}>Close</button>
            <button className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" onClick={toggleFavorite}>Favorite  <i className={favoriteState(props.movie.id)}></i></button></span>
        </section>
      </article>
    );
  }
}

export default Details;

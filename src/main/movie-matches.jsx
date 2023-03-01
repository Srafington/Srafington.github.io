import React, { useCallback } from "react";
import { Link } from "react-router-dom";

function MovieMatches(props) {

  const favoriteState = useCallback((movieId) => {
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
    props.toggleFavorite(e.target.attributes.value.value)
  }
  const showDetails = (e) => {
    const selectedMovie = props.movies.filter(movie => movie.id === Number(e.target.value))[0];
    props.showDetails(selectedMovie);
  }
  if (props.show) {
    return (
      <table className="overflow-scroll block col-span-2 shadow-lg border-slate-700 border-solid border rounded-lg p-2">
        <thead>

          <tr>
            <th></th>
            <th>Title</th>
            <th>Year</th>
            <th>Rating</th>
            <th>Popularity</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {props.movies?.map((movie) =>
            <tr key={movie.id}>
              <td className="aspect-square"><img src={`https://image.tmdb.org/t/p/w92/${movie.poster}`} alt={movie.title} className="w-1/3" /></td>
              <td>{movie.title}</td>
              <td>{movie.release_date.substring(0, 4)}</td>
              <td>{movie.ratings.average}</td>
              <td>{Math.round(movie.ratings.popularity)}</td>
              <td><button value={movie.id} onClick={toggleFavorite} className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" >
                <i className={favoriteState(movie.id)} value={movie.id}></i></button></td>
              <td>
                <button className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  value={movie.id} onClick={showDetails}>Details</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

    );
  }
}

export default MovieMatches;

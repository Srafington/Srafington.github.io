import React, { useCallback, useEffect } from "react";
import Header from "./header";
import MovieFilters from "./movie-filters";
import Favorites from "./favorites";
import MovieMatches from "./movie-matches";
import { useParams } from "react-router-dom";
import Details from "../details/details";


function Main(props) {

  const [FavoriteMovies, setFavorites] = React.useState(
    []
  );
  const [genres, setGenres] = React.useState(
    []
  );
  const [FilteredMovies, setFilteredMovies] = React.useState(
    props.movies
  );
  const [DetailMovie, setDetailMovie] = React.useState(
    props.movies[0]
  )
  const [showDetail, setShowDetail] = React.useState(
    false
  )

  const showDetails = (movie) => {
    setDetailMovie(movie);
    setShowDetail(true);
  }
  const hideDetails = () => {
    setShowDetail(false);
  }

  const toggleFavorite = (movieId) => {
    const updatedFavs = [...(FavoriteMovies ?? [])];
    let index = updatedFavs.findIndex(movie => movie.id === Number(movieId));
    if (index >= 0) {
      updatedFavs.splice(index, 1);
    } else {
      const newFav = props.movies.filter(movie => movie.id === Number(movieId))[0]
      updatedFavs.push(
        newFav
      )
    }
    setFavorites(updatedFavs);
  }

  let { searchTerm } = useParams();
  const applyFilter = useCallback(
    (filterType, filterValues) => {
      const titleFilter = (filterValue) => {
        const updatedFilteredMovies = props.movies?.filter((movie) => movie.title.toUpperCase().includes(filterValue.toUpperCase()));
        setFilteredMovies(updatedFilteredMovies);
      }
      const genreFilter = (filterValue) => {
        const updatedFilteredMovies = props.movies?.filter((movie) =>
          movie.details.genres.filter(genre =>
            genre.id === Number(filterValue)).length > 0
        );
        setFilteredMovies(updatedFilteredMovies);
      }
      const yearFilter = (filterValues) => {
        const updatedFilteredMovies = props.movies?.filter((movie) =>
          movie.filter(movie => {
            const year = Number(movie.release_date.substring(0, 4));
            return year >= Number(filterValues.min) && year <= Number(filterValues.Max)
          }).length > 0
        );
        setFilteredMovies(updatedFilteredMovies);
      }
      const ratingFilter = (filterValue) => {
        const updatedFilteredMovies = props.movies?.filter((movie) =>
          movie.filter(movie => movie.ratings.average >= Number(filterValue)).length > 0
        );
        setFilteredMovies(updatedFilteredMovies);
      }
      const clearFilter = () => {
        const updatedFilteredMovies = props.movies
        setFilteredMovies(updatedFilteredMovies);
      }

      switch (filterType) {
        case 'title': titleFilter(filterValues); break;
        case 'genre': genreFilter(filterValues); break;
        case 'year': yearFilter(filterValues); break;
        case 'rating': ratingFilter(filterValues); break;
        default: clearFilter(); break;
      }
    }, [props])


  useEffect(() => {
    if (sessionStorage.getItem("movieFavorites") && !FavoriteMovies.length) {
      setFavorites(JSON.parse(sessionStorage.getItem("movieFavorites")));
    }
    if (searchTerm) {
      applyFilter('title', searchTerm);
    }
    if (!genres.length) {

      const genreMap = new Map();
      let tempGenres = [];
      props.movies.forEach(movie => {
        movie.details.genres?.forEach(genre => {
          genreMap.set(genre.id, genre.name);
        })
      });
      for (const [genreId, genreName] of genreMap) {
        tempGenres.push({ id: genreId, name: genreName });
      }
      const sortedGenres = tempGenres.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        }
        return 0;
      });
      if (sortedGenres) {
        setGenres(sortedGenres);
      }
    }
  }, [FavoriteMovies, genres, props, searchTerm, applyFilter]);


  return (
    <main className="container mx-auto w-full backdrop-blur-xl bg-black/50 rounded-lg text-white p-8 max-h-screen">
      <Header></Header>
      <section className="grid grid-cols-4 gap-4 m-4">
          <Details movie={DetailMovie} className="shadow-lg border-slate-700 border-solid border rounded-lg p-2 col-span-3" show={showDetail} favorites={FavoriteMovies} toggleFavorite={toggleFavorite} hideDetails={hideDetails}></Details>
          <MovieFilters genres={genres} filterMethod={applyFilter} show={!showDetail}></MovieFilters>
          <MovieMatches className="" movies={FilteredMovies} favorites={FavoriteMovies} toggleFavorite={toggleFavorite} showDetails={showDetails} show={!showDetail}></MovieMatches>
        <Favorites className="" favorites={FavoriteMovies} toggleFavorite={toggleFavorite}></Favorites>
      </section>
    </main>
  );
}

export default Main;

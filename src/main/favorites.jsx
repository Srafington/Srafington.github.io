import React, { useEffect } from "react";

function Favorites(props) {




  const unFavorite = (e) => {
    props.toggleFavorite(e.target.id)
  }
  return (
    <section className="shadow-lg border-slate-700 border-solid border rounded-lg p-2">
      <h2>Favorites</h2>
      {props.favorites.map(fav => {
      return <Favorite image={fav.poster} title={fav.title} key={fav.id} id={fav.id} unFavorite={unFavorite}>
        
      </Favorite>})}
    </section>
  );
}

function Favorite(props) {
  return (
    <section >
      <span>
        <img src={`https://image.tmdb.org/t/p/w185${props.image}`} alt={props.title} />
        <button id={props.id} onClick={props.unFavorite} className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" ><i className="fa-solid fa-heart"></i></button>
      </span>
      <span>{props.title}</span>
    </section>
  )
}

export default Favorites;

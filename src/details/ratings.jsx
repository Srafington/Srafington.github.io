import React from "react";

function Ratings(props) {

  const [rating, setRating] = React.useState(
    // props.ratings.details?.userRating ?? 0
  );
  const [count, setCount] = React.useState(
    props.ratings.count
  );

  const [disabled, setDisabled] = React.useState(
  );

  const handleRating = (e) => {
    setRating(e.target.value);
    
  }


  const handleSubmitRating = (e) => {
    setCount(count+1);
    setDisabled(true);
    e.preventDefault();
  }

  if(rating){
    setDisabled(true);
  }

  return (
    <section>
      <h3 className="text-2xl font-semibold text-white">Ratings</h3>
      <ul>
        <li>
          Popularity: {props.ratings.popularity}
        </li>
        <li>
          Average Rating: {props.ratings.average}
        </li>
        <li>
          Number of Ratings: {count}
        </li>
      </ul>
      <br />
      <h4 className="text-xl font-semibold text-white">Add your rating!</h4>
      <form onSubmit={handleSubmitRating}>
        <input type="range" name="rating" id="rating" min="0" max="10" step="0.5" value={rating} onChange={handleRating} disabled={disabled}/><br />
        <button type="submit" className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" >Rate!</button>
      </form>
    </section>
  )
}


export default Ratings;


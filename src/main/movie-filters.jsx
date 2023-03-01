import React from "react";

function MovieFilters(props) {

  const [value, setValue] = React.useState(
    {
      mode: 'title',
      title: '',
      genre: '',
      yearMin: '',
      yearMax: '',
      rating: 0
    }
  )

  const handleChange = (e) => {
    const updatedFilters = { ...value };
    if (e.target.name === "filterMethod") {
      updatedFilters.mode = e.target.defaultValue;
    } else if (e.target.name === value.mode) {
      updatedFilters[e.target.name] = e.target.value
    }
    setValue(updatedFilters);
  }
  const applyFilter = (e) => {
    e.preventDefault();
    if (e.target.type === "reset") {
      setValue(
        {
          mode: 'title',
          title: '',
          genre: '',
          yearMin: '',
          yearMax: '',
          rating: 0
        }
      )
      props.filterMethod("reset", "");
    } else if (value.mode === 'year') {
      props.filterMethod(value.mode, { min: value.yearMin, max: value.yearMax });
    }
    else {
      props.filterMethod(value.mode, value[value.mode] ? value[value.mode] : '');
    }
  }

  if (props.show) {
    return (
      <form onSubmit={applyFilter} className="container shadow-lg border-slate-700 border-solid border rounded-lg p-2">
        <div className="p-2 text-align-left">
          <input type="radio" name="filterMethod" id="rTitle" value="title" onChange={handleChange} className="m-2" />
          <span>

            <label htmlFor="tTitle">Title</label>
            <input type="text" name="title" id="tTitle" className="px-4 py-1 text-sm text-black font-semibold rounded-lg border border-blue-200 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" value={value.title} onChange={handleChange} />
          </span>
        </div>
        <div className="p2">
          <input type="radio" name="filterMethod" id="rGenre" value="genre" onChange={handleChange} className="m-2" />
          <span>

            <label htmlFor="tGenre">Genre</label>
            <select name="genre" id="tGenre" className="px-4 py-1 text-sm text-black font-semibold rounded-lg border border-blue-200 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" value={value.genre} onChange={handleChange} >
              {props.genres?.map(genre => {
                return <option value={genre.id} key={genre.id} >{genre.name}</option>
              })}
            </select>
          </span>
        </div>

        <div className="p-2">
          <input type="radio" name="filterMethod" id="rYear" value="year" onChange={handleChange} className="m-2" />
          <span >

            <label htmlFor="tYearMin">Year</label>
            <input type="text" name="yearMin" id="tYearMin" className="px-4 py-1 text-sm text-black font-semibold rounded-lg border border-blue-200 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" value={value.yearMin} onChange={handleChange} />
            <br />
            <label htmlFor="tYearMax">To</label>
            <input type="text" name="yearMax" id="tYearMax" className="px-4 py-1 text-sm text-black font-semibold rounded-lg border border-blue-200 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" value={value.yearMax} onChange={handleChange} />
          </span>
        </div>
        <div className="p-2">
          <input type="radio" name="filterMethod" id="rRating" value="rating" onChange={handleChange} className="m-2" />
          <span >
            <label htmlFor="tRating">Min-Rating</label>
            <input type="range" name="rating" id="tRating" min="0" max="10" step="0.1" className="px-4 py-1 text-sm text-white font-semibold rounded-lg border border-blue-200 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" value={value.rating} onChange={handleChange} />
          </span>
        </div>
        <button type="submit" className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" >Filter</button>
        <button type="reset" className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" onClick={applyFilter}>Clear</button>
      </form>
    );
  }
}


export default MovieFilters;

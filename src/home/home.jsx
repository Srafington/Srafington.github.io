import React from "react";
import { Link, Form } from "react-router-dom";
//Button styling based on teh cursed Tailwind example 
function Home(props) {
  const [searchName, setSearchName] = React.useState(
    ''
  );
  const searchHandler = (e) => {
    e.preventDefault();
    setSearchName(e.target.value)
  }
  return (
    <div className="shadow-md p-16 container mx-auto flex place-content-center backdrop-blur-xl bg-black/50 rounded-lg m-24">
      <span className="justify-content-centre">

        <h2 className="text-center text-5xl font-semibold text-white ">
          Movie Browser
        </h2>
        <form className="text-center">
          <label htmlFor="movieTitle" className="text-white font-semibold">Title</label>
          <input type="text" name="movieTitle" value={searchName} onChange={searchHandler} className="px-4 py-1 text-sm text-black font-semibold rounded-lg border border-blue-200 hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2"></input>
          <div>
            <Link to={`main/${searchName}`} >
              <input type="button" name="submit" id="" value={"Search For Movie"} className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" />
            </Link>
            <Link to={"main"}>
              <input type="button" name="showAll" id="" value={"Show All Movies"} className="px-4 py-1 text-sm text-white font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 m-2" />
            </Link>
          </div>
        </form>
      </span>
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";

//Components
import Home from './home/home';
import Main from './main/main';
import Details from "./details/details";



function App() {
  const [movieList, setMovieList] = React.useState(
    []
  );
  useEffect(() => {
    if (sessionStorage.getItem("movieList")) {
      setMovieList(JSON.parse(sessionStorage.getItem("movieList")));
    } else {
      const getData = async () => {
        try {
          const url = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=20";
          const response = await fetch(url, { crossDomain: true });
          const data = await response.json();
          setMovieList(...data);
          sessionStorage.setItem("movieList", JSON.stringify(data));
        }
        catch (err) {
          console.error(err);
        }
      }
      getData();
    }
  }, []);
  return (

    <Routes>
      <Route path="/" element={<NavRoot />}>
        <Route index element={<Home />} />
        <Route path="main" >
          <Route index element={<Main movies={movieList} />} />
          <Route path=":searchTerm" element={<Main movies={movieList} />} />
        </Route>
      </Route>
    </Routes>

  );
}

function NavRoot(props) {
  return (

    <Outlet />

  )
}

export default App;

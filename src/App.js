import React, { useState, useEffect } from "react";
import { Router } from '@reach/router';
import Home from './pages/Home'
import User from './pages/User'

const App = () => {
    const [myMovies, setMyMovies] = useState([])
    
    useEffect(() => {
      let movies = localStorage.getItem("movies");
      if (movies) {
        movies = JSON.parse(movies);
      } else {
        movies = [];
      }
      console.log("fetched movies: ", movies);
      setMyMovies(movies);
    }, []);
  
    const addToMyMovies = (movieData) => {
      let newMyMovies = myMovies.slice();
      const found = newMyMovies.find(storedMovieData => storedMovieData["imdbID"] === movieData["imdbID"])
      if(found) { return; }
      newMyMovies = newMyMovies.concat([movieData]);
      setMyMovies(newMyMovies);
  
      localStorage.setItem("movies", JSON.stringify(newMyMovies));
    };
  
    const removeFromMyMovies = (movieData) => {
      let newMyMovies = myMovies.slice();
      newMyMovies = newMyMovies.filter(
        (movie) => movie["imdbID"] !== movieData["imdbID"]
      );
      setMyMovies(newMyMovies);
  
      localStorage.setItem("movies", JSON.stringify(newMyMovies));
    };
  
    const makeIntoFullMovie = (movieData, index) => {
      //console.log('fullMovie')
      let newMyMovies = myMovies.slice();
      newMyMovies[index] = {...movieData, myMovieType: 'full'}
      setMyMovies(newMyMovies);
  
      localStorage.setItem("movies", JSON.stringify(newMyMovies));
  
    }
  
    return (
      <Router>
        <Home path="/movies-to-watch-app" moviesAdded={myMovies.length} addToMyMovies={addToMyMovies} />
        <User path="/movies-to-watch-app/my-movies" myMovies={myMovies} removeFromMyMovies={removeFromMyMovies} makeIntoFullMovie={makeIntoFullMovie} />
      </Router>
    );
  };

  export default App
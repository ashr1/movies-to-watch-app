import React, { useState, useEffect } from "react"
import { Link } from '@reach/router';
import fetchMoviesFullQuery from '../api/fetchMoviesFullQuery'
import { MovieDisplayApp } from '../components/MovieDisplayAppComponent'
import UserMovieDisplayAppComponent from '../components/UserMovieDisplayAppComponent'
import { HomePageContainerStyle, HomePageHeaderStyle, HomePageLinkStyle } from '../globalStyles/HomePageStyles'
import { ErrorMsgStyle } from '../globalStyles/generalStyles'

const MovieDisplayAppUser = MovieDisplayApp('✗')

const User = ({ myMovies, removeFromMyMovies, makeIntoFullMovie }) => {
    const [requestBeingMade, setRequestBeingMade] = useState(false)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      if(error) {
        setError(null)
      }
    }, [myMovies])
  
    const makeMovieRequest = (movieData, index) => {
      if(requestBeingMade) {
        return;
      }
      const queryParams = { i: movieData.imdbID }
  
      setRequestBeingMade(true)
  
      fetchMoviesFullQuery(queryParams)
      .then(movie => {
        setRequestBeingMade(false)
        displayResult(movie, index) 
      })
      .catch(err => {
        setRequestBeingMade(false)
        setError([index,'Something went wrong making a request.'])
      })
    }
  
    const displayResult = (incMovieData, index) => {
      if(incMovieData['Response'] === 'True') {
        makeIntoFullMovie(incMovieData, index)
        setError(null) // all parameters were right, but maybe network connection failed
      } else {
        setError([index,incMovieData['Error']])
      }
    }
  
    return (
      <div style={HomePageContainerStyle}>
        <h1 style={HomePageHeaderStyle}>My Movies</h1>
        <Link to="/" style={HomePageLinkStyle}>Home</Link>
        {myMovies.length > 0 &&
          myMovies.map((movieData, index) =>
            movieData.myMovieType === "full" ? (
              <MovieDisplayAppUser
                key={index}
                {...movieData}
                handleClick={() => removeFromMyMovies(movieData)}
              />
            ) : (   
                <UserMovieDisplayAppComponent
                  key={index}
                  {...movieData}
                  handleClickClose={() => removeFromMyMovies(movieData)}
                  handleClickRefresh={() => makeMovieRequest(movieData, index)}
                >
                  { error && error[0] === index && <p style={ErrorMsgStyle}>{error[1]}</p> }
                </UserMovieDisplayAppComponent>
          
            )
          )}
      </div>
    );
  }

  export default User
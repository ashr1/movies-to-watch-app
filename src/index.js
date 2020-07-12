import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from '@reach/router';
import fetchMoviesFullQuery from './api/fetchMoviesFullQuery'
import Loading from './components/Loading'
import RadioButton from './components/RadioButton'
import UserMovieDisplayAppComponent from './components/UserMovieDisplayAppComponent'
import { MovieDisplayApp, MovieDisplayPreviewApp } from './components/MovieDisplayAppComponent'
import { ErrorMsgStyle } from './globalStyles/generalStyles'
import GeneralMovieSearch from './components/GeneralMovieSearch'
import SpecificMovieForm from './components/SpecificMovieForm'


const MovieDisplayAppHome = MovieDisplayApp('✓')
const MovieDisplayPreviewAppHome = MovieDisplayPreviewApp('✓')

const MovieDisplayAppUser = MovieDisplayApp('✗')


const HomePageContainerStyle = {
  maxWidth: '300px',
  margin: '0 auto'
}

const HomePageHeaderStyle = {
  textAlign: 'center',
  color: 'rgb(88,79,79)',
  fontFamily: 'monospace'
}

const HomePageLinkStyle = {
  textDecoration: 'none',
  color: 'rgb(129,105,85)',
  backgroundColor: '#ffe4c4',
  position: 'sticky',
  top: '0',
  margin: '30px 0',
  display: 'block',
  textAlign: 'center'
}

// movieFunction parameter
const Home = ({ moviesAdded, addToMyMovies }) => {
  const [specificMovie, setSpecificMovie] = useState(true)
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const makeMovieRequest = (queryParams) => {
    setLoading(true)
    fetchMoviesFullQuery(queryParams)
    .then(movie => {
      setLoading(false)
      displayResult(movie) 
    })
    .catch(err => {
      setLoading(false)
      setError('Something went wrong making a request.')
    })
  }

  const displayResult = (incMovieData) => {
    if(incMovieData['Response'] === 'True') {
      console.log(incMovieData)
      setMovieData(incMovieData)
      setError('') // all parameters were right, but maybe network connection failed
    } else {
      setError(incMovieData['Error'])
    }
  }

  const displayMovieType = () => {
    return !movieData["Search"] ?  <MovieDisplayAppHome {...movieData} handleClick={() => addToMyMovies({...movieData, myMovieType: 'full'})} /> : movieData["Search"].map((result, index) => <MovieDisplayPreviewAppHome key={index} {...result} handleClick={() => addToMyMovies({...result, myMovieType: 'preview'})} />)
  }

  return (
    <div style={HomePageContainerStyle}>
      <h1 style={HomePageHeaderStyle}>Movies To Watch</h1>
      <Link to="/my-movies" style={HomePageLinkStyle}>My Movies ({moviesAdded})</Link>
      <RadioButton
        id="specMovieForm"
        name="movieForm"
        checked={specificMovie}
        handleChange={() => setSpecificMovie(true)}
        label="Specific Movie"
      />
      <RadioButton
        id="generalMovieForm"
        name="movieForm"
        checked={!specificMovie}
        handleChange={() => setSpecificMovie(false)}
        label="General Movies"
      />

      {specificMovie ? (
        <SpecificMovieForm
          handleSubmit={makeMovieRequest}
          onFormChange={() => setError("")}
        />
      ) : (
        <GeneralMovieSearch
          handleSubmit={makeMovieRequest}
          onFormChange={() => setError("")}
        />
      )}

      {error && <p style={ErrorMsgStyle}>{error}</p>}

      <Loading loading={loading} />

      {movieData && displayMovieType()}

    </div>
  );
}

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
    // TODO: the preview movies can't be deleted like this
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
      <Home path="/" moviesAdded={myMovies.length} addToMyMovies={addToMyMovies} />
      <User path="/my-movies" myMovies={myMovies} removeFromMyMovies={removeFromMyMovies} makeIntoFullMovie={makeIntoFullMovie} />
    </Router>
  );
};

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

ReactDOM.render(<App />, document.getElementById("root"));



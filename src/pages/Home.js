import React, { useState } from "react"
import { Link } from '@reach/router';
import fetchMoviesFullQuery from '../api/fetchMoviesFullQuery'
import { MovieDisplayApp, MovieDisplayPreviewApp } from '../components/MovieDisplayAppComponent'
import Loading from '../components/Loading'
import RadioButton from '../components/RadioButton'
import GeneralMovieSearch from '../components/GeneralMovieSearch'
import SpecificMovieForm from '../components/SpecificMovieForm'
import { HomePageContainerStyle, HomePageHeaderStyle, HomePageLinkStyle } from '../globalStyles/HomePageStyles'
import { ErrorMsgStyle } from '../globalStyles/generalStyles'

const MovieDisplayAppHome = MovieDisplayApp('✓')
const MovieDisplayPreviewAppHome = MovieDisplayPreviewApp('✓')

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
        <Link to="/movies-to-watch-app/my-movies" style={HomePageLinkStyle}>My Movies ({moviesAdded})</Link>
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

  export default Home
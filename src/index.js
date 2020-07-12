import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from '@reach/router';
import fetchMoviesFullQuery from './api/fetchMoviesFullQuery'
import Loading from './components/Loading'
import Select from './components/Select'
import RadioButton from './components/RadioButton'
import { PrimaryButton } from './components/Button'
import { TextInput } from './components/Input'
import YearInput from './components/YearInput'
import ImageComponent, { imageStyle } from './components/ImageComponent'
import MoviePreviewDisplay from './components/MoviePreviewDisplay'
import MovieDisplay from './components/MovieDisplay'

  const GeneralMovieSearch = ({ handleSubmit, onFormChange }) => {
    const [s, setS] = useState('')
    const [type, setType] = useState('')
    const [year, setYear] = useState('')
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)
    // const [movieData, setMovieData] = useState(null)
  
    const submitForRequest = () => {
      if(s) {
        const queryParams = {
          s,
          type,
          y: year,
          page
        }
        handleSubmit(queryParams)
      } else {
        setError('You must specify the title.')
      } // form validation
    }
  
    const handleInput = (e) => {
      setError('')
      onFormChange()
      switch(e.target.id) {
        case 's':
          console.log(e.target.id);
          setS(e.target.value);
          break;
        case 'type':
          console.log(e.target.id);
          setType(e.target.value);
          break;
        case 'page':
          console.log(e.target.id);
          setPage(e.target.value);
          break;
        case 'year':
          console.log(e.target.id);
          setYear(e.target.value);
          break;
        default:
          break;
      }
    }
  
    return (
      <div>
        <TextInput 
          id="s" 
          value={s} 
          handleChange={handleInput}
          placeholder={"Enter the title of the movie"}
        />
        <Select
          id='type'
          label='Search By: '
          options={[
            {
              value: '',
              text: 'Default'
            },
            {
              value: 'movie',
              text: 'Movie'
            },
            {
              value: 'series',
              text: 'Series'
            },
            {
              value: 'episode',
              text: 'Episode'
            }
          ]}
          value={type}
          handleSelect={handleInput}
        />
        
        <YearInput 
          id='year'
          label='Year: '
          value={year}
          min={1000} 
          max={3000} 
          step={200}
          handleChange={handleInput}
        />

        <YearInput 
          id='page'
          label='Page: '
          value={page}
          min={1} 
          max={100} 
          step={1}
          handleChange={handleInput}
        />

        <PrimaryButton text="Search" handleClick={() => submitForRequest()}/>
        { error && <p style={ErrorMsgStyle}>{error}</p>}

      </div>
    )
  }

const SpecificMovieForm = ({ handleSubmit, onFormChange }) => {
  const [i, setI] = useState('')
  const [t, setT] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')
  const [plot, setPlot] = useState('short')
  const [error, setError] = useState('')
  //const [loading, setLoading] = useState(false)
  // const [movieData, setMovieData] = useState(null)

  const submitForRequest = () => {
    if(i || t) {
      const queryParams = {
        i,
        t,
        type,
        y: year,
        plot
      }
      handleSubmit(queryParams)
    } else {
      setError('You must specify either an id or title. Both are not required.')
    } // form validation
  }

  const handleInput = (e) => {
    setError('')
    onFormChange()
    switch(e.target.id) {
      case 't':
        console.log(e.target.id);
        setT(e.target.value);
        break;
      case 'i':
        console.log(e.target.id);
        setI(e.target.value);
        break;
      case 'type':
        console.log(e.target.id);
        setType(e.target.value);
        break;
      case 'plot':
        console.log(e.target.id);
        setPlot(e.target.value);
        break;
      case 'year':
        console.log(e.target.id);
        setYear(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <TextInput 
        id="t" 
        value={t} 
        handleChange={handleInput}
        placeholder={"Enter the title of the movie"}
      />
      <TextInput 
        id="i" 
        value={i} 
        handleChange={handleInput}
        placeholder={"Enter the imdbID of the movie"}
      />
      <Select
        id='type'
        label='Search By: '
        options={[
          {
            value: '',
            text: 'Default'
          },
          {
            value: 'movie',
            text: 'Movie'
          },
          {
            value: 'series',
            text: 'Series'
          },
          {
            value: 'episode',
            text: 'Episode'
          }
        ]}
        value={type}
        handleSelect={handleInput}
      />
      
      <YearInput 
        id='year'
        label='Year: '
        value={year}
        min={1000} 
        max={3000} 
        step={200}
        handleChange={handleInput}
      />
      <Select
        id='plot'
        label='Plot: '
        options={[
          {
            value: 'short',
            text: 'Short'
          },
          {
            value: 'full',
            text: 'Full'
          },
        ]}
        value={plot}
        handleSelect={handleInput}
      />
      <PrimaryButton text="Search" handleClick={() => submitForRequest()}/>
      { error && <p style={ErrorMsgStyle}>{error}</p>}
    </div>
  )
}

const ErrorMsgStyle = { 
  color: '#ff4d66', 
  fontFamily: 'monospace',
  margin: '5px' 
}

//✗
//✓
//↻ ↺

const AddRemoveStyle = {
  textAlign: "right", 
  color: 'rgb(88,79,79)',
  margin: "0 0 -23px 0" 
}
const AddRemoveHiddenStyle = {
  textAlign: "right", 
  margin: "0 0 -23px 0",
  color: 'rgb(88,79,79)',
  visibility: 'hidden' 
}

const InteractiveSymbol = ({ symbol, handleClick, ...rest }) => {
  return (
    <span onClick={handleClick} {...rest}>{symbol}</span>
  )
}

const InteractiveSymbolContainer = ({ children }) => (
  <p style={AddRemoveStyle}>
    { children }
  </p>
)

const UserMovieSymbolContainer = ({ handleClickRefresh, handleClickClose }) => {
  return (
    <InteractiveSymbolContainer>
      <InteractiveSymbol
        symbol={"↻"}
        handleClick={handleClickRefresh}
        style={{ cursor: 'pointer' }}
      />
      <InteractiveSymbol
        symbol={"✗"}
        handleClick={handleClickClose}
        style={{ paddingLeft: '23px', cursor: 'pointer' }}
      />
    </InteractiveSymbolContainer>
  );
}

const UserMovieDisplayAppComponent = ({ children, handleClickRefresh, handleClickClose, ...rest }) => {
  return (
    <div style={MovieAppComponentStyles}>
      { children }
      <UserMovieSymbolContainer
        handleClickRefresh={handleClickRefresh}
        handleClickClose={handleClickClose}
      />
      <MoviePreviewDisplay {...rest} />
    </div>
  );
};

const SingleMovieSymbolContainer = ({ symbol, handleClick }) => {
  return (
    <InteractiveSymbolContainer>
      <InteractiveSymbol
        symbol={symbol}
        handleClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    </InteractiveSymbolContainer>
  )
}

const MovieDisplayAppComponent = (MovieDisplayType) => {
  return (symbol) => {
    return ({ handleClick, ...rest }) => {
      return (
        <div 
          style={MovieAppComponentStyles}
        >
          <SingleMovieSymbolContainer symbol={symbol} handleClick={handleClick} />
          <MovieDisplayType {...rest} />
        </div>
      );
    };
  }
}

const MovieAppComponentStyles = { 
  maxWidth: "300px", 
  textAlign: 'center', 
  margin: '15px 0' 
}

const MovieDisplayApp = MovieDisplayAppComponent(MovieDisplay)
const MovieDisplayPreviewApp = MovieDisplayAppComponent(MoviePreviewDisplay)

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



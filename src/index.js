import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from '@reach/router';

const API_KEY = "";
const url = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

// query builder:
const bySearch = {
  s: "",
  type: {
    val: "",
    options: ["movie", "series", "episode"],
  },
  y: "",
  r: {
    val: "json",
    options: ["json", "xml"],
  },
  callback: "",
  v: 1,
  page: {
    val: 1,
    options: [1, 100],
  },
};

const byTitleOrId = {
  i: "",
  t: "",
  type: {
    val: "",
    options: ["movie", "series", "episode"],
  },
  y: "",
  plot: {
    value: "short",
    options: ["short", "full"],
  },
  r: {
    val: "json",
    options: ["json", "xml"],
  },
  callback: "",
  v: 1,
};

const fetchMoviesFullQuery = (queryParams) => {
  let paramsSection = Object.keys(queryParams)
                              .map(q => queryParams[q] ? `${q}=${encodeURIComponent(queryParams[q])}&` : '')
                              .join('')
  paramsSection = /&$/.test(paramsSection) ? paramsSection.slice(0,-1) : paramsSection
  const URL = url + paramsSection;
  return fetch(URL).then((response) => response.json());
};

const Loading = ({ loading }) =>
  loading ? (
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "5px solid",
        borderColor: "white rgb(141,135,130) rgb(141,135,130) rgb(141,135,130)",
        borderRadius: "50%",
        margin: "0 auto",
        animation: "spin 1s linear infinite",
      }}
    >
      <style>
        {`
          @keyframes spin{
            0%{
              transform: rotate(0deg);
            }
            100%{
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  ) : null;

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

const Input = ({ name, value, handleChange, type, ...rest }) => {
  return (
    <div>
      <input 
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  )
}

// preventing the default input background highlight:
// add !important to color
// add background-image: initial !important
// add background-color: transparent !important
const TextInputStyle = {
  borderWidth: '0 0 1px 0',
  fontFamily: 'monospace',
  borderColor: '#cdd7e5',
  color: '#584f4f',
  outline: 'none',
  width: '300px',
  margin: '10px',
  backgroundImage: 'initial',
  backgroundColor: 'transparent'
}

const TextInput = (props) => <Input {...props} type="text" style={TextInputStyle} />
const NumberInput = ({ max, min, step, ...rest  }) => <Input {...rest} max={max} min={min} step={step ? step : 1} type="number" style={TextInputStyle} />

const YearInputContainerStyle = {
  width: '300px',
  fontFamily: 'monospace',
  color: '#584f4f',
  margin: '10px',
}

const YearInputStyle = {
  borderWidth: '0 0 1px 0',
  fontFamily: 'monospace',
  borderColor: '#cdd7e5',
  color: '#584f4f',
  outline: 'none',
  backgroundImage: 'initial',
  backgroundColor: 'transparent'
}

const YearInput = ({ 
  name, 
  value, 
  handleChange, 
  label, 
  id, 
  max,
  min,
  step,
}) => {
  return (
    <div style={YearInputContainerStyle}>
      {label && <label htmlFor={id}>{label}</label>}
      <input 
        name={name}
        id={id}
        type='number'
        value={value}
        max={max}
        min={min}
        step={step}
        onChange={handleChange}
        style={YearInputStyle}
      />
    </div>
  )
}

const ButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'rgb(233,197,166)',
  color: '#584f4f',
  borderStyle: 'none',
  fontFamily: 'monospace',
  margin: '10px',
  outline: 'none'
}

const Button = ({ text, handleClick, ...rest }) => {
  return (
    <div>
      <button onClick={handleClick} {...rest} >{text}</button>
    </div>
  )
}
//TODO: add hover background color
const PrimaryButton = (props) => (
  <Button 
    {...props}
    style={ButtonStyle}
  />
)

const SelectStyle = {
  borderWidth: '0 0 1px 0',
  borderColor: '#cdd7e5',
  outline: 'none',
  
  color: '#584f4f'
}

const SelectContainer = {
  width: '300px',
  fontFamily: 'monospace',
  color: '#584f4f',
  margin: '10px',
}

const Select = ({ id, label, options, value, handleSelect }) => {
  return (
    <div style={SelectContainer}>
      <label htmlFor={id}>{label} </label>
      <select id={id} value={value} onChange={handleSelect} style={SelectStyle}>
        {
          options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)
        }
      </select>
    </div>
  )
}

const movieContainerStyle = {
  color: "black",
  fontFamily: "monospace",
  maxWidth: "310px",
};
const imageStyle = {
  width: "150px",
  height: "auto",
};
const titleStyle = {
  fontSize: "23px",
  marginBottom: "2px",
};
const titleSubStyle = {
  fontSize: "14px",
};
const titleAssistStyle = {
  marginTop: "2px",
};

const omdbNACheck = (v) => v !== "N/A";

const ImageComponent = ({ src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src)
  useEffect(() => {
    setImgSrc(src)
  }, [src])
  const fallBackSrc = () => setImgSrc("https://via.placeholder.com/150.jpg/000000/FFFFFF/?text=Movie+Poster")
  return (
    <img 
      src={imgSrc}
      onError={fallBackSrc}
      {...rest}
    />
  )
}

const MoviePreviewDisplay = ({
  Poster,
  Title,
  Type,
  Year,
  imdbID
}) => {
  const altImgSrc =
  "https://via.placeholder.com/150.jpg/000000/FFFFFF/?text=Movie+Poster";

const imgSrc = /^https?/.test(Poster) ? Poster : altImgSrc;

return (
  <div style={movieContainerStyle}>
    <p style={titleStyle}>{Title}</p>
    <p style={titleAssistStyle}>
      <span style={titleSubStyle}>{Year} </span>
      <span>{Type} </span>
    </p>
    <div>
      <ImageComponent src={imgSrc} style={imageStyle} />
    </div>
    <p>
      <span style={{ fontWeight: "bold" }}>imdbID:</span> {imdbID}
    </p>
  </div>
);
}

const MovieDisplay = ({
  Poster,
  Title: title,
  Actors: actors,
  Director: director,
  Genre: genre,
  Runtime: runtime,
  Rated: rated,
  Released,
  imdbRating,
  Plot: plot,
}) => {
  const altImgSrc =
    "https://via.placeholder.com/150.jpg/000000/FFFFFF/?text=Movie+Poster";

  const imgSrc = /^https?/.test(Poster) ? Poster : altImgSrc;

  const released = omdbNACheck(Released) ? Released.slice(-4) : Released;

  return (
    <div style={movieContainerStyle}>
      <p style={titleStyle}>{title}</p>

      <p style={titleAssistStyle}>
        <span style={titleSubStyle}>{released} </span>
        <span>{runtime} </span>
        <span>{rated}</span>
      </p>

      <div>
        <ImageComponent src={imgSrc} style={imageStyle} />
      </div>

      <div>
        <p style={{ fontWeight: "bold" }}>{genre}</p>
        <p>{plot}</p>
      </div>

      <div>
        <p>
          <span style={{ fontWeight: "bold" }}>Directed By:</span> {director}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Actors:</span> {actors}
        </p>
      </div>

      <div style={{ display: "inline-block", marginTop: "10px" }}>
        <span style={{ display: "block", fontSize: "25px" }}>{imdbRating}</span>
        <span>imdbRating</span>
      </div>
    </div>
  );
};

const RadioButtonContainerStyle = {
  fontFamily: 'monospace',
  color: 'rgb(88,79,79)',
  margin: '10px'
}

const RadioButtonLabelStyle = {
  margin: '10px'
}

const RadioButton = ({ label, id, name, checked, handleChange }) => {
  return (
    <div style={RadioButtonContainerStyle}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} style={RadioButtonLabelStyle}>{label}</label>
    </div>
  );
};

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



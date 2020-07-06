import React, { useState } from "react";
import ReactDOM from "react-dom";

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

const TextInput = (props) => <Input {...props} style={TextInputStyle} />

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

{/* <div>
        <label>Parameter:</label>
        <select value={select} onChange={handleSelect}>
          <option value="t">t</option>
          <option value="s">s</option>
        </select>
      </div> */}

const SelectStyle = {
  borderWidth: '0 0 1px 0',
  fontFamily: 'monospace',
  borderColor: '#cdd7e5',
  color: '#584f4f',
  outline: 'none',
  width: '300px',
  margin: '10px'
}

const Select = ({ options, value, handleSelect }) => {
  return (
    <div>
      <select value={value} onChange={handleSelect} style={SelectStyle}>
        {
          options.map((option, index) => <option key={index} value={option.value} selected={!option.value} disabled={!option.value}>{option.text}</option>)
        }
      </select>
    </div>
  )
}

const fetchMovies = (title, select) => {
  const URL = url + `${select}=` + encodeURIComponent(title);
  console.log(URL);
  return fetch(URL).then((response) => response.json());
};

const App = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [select, setSelect] = useState('')
  const [result, setResult] = useState(null)
//TODO: build search parameters based on input
  const makeMovieRequest = () => {
    if(select && title) {
      setLoading(true);
    fetchMovies(title, select).then((movie) => {
      setLoading(false);
      setMovie(movie);
      setResult(prevState => movieItemToDisplay(movie))
    });
    } 
    //TODO: add message for field missing
    // else {
    //   setResult(<p>Please input missing fields.</p>)
    // }
  };

  const movieItemToDisplay = (result) => {
    if(result["Response"] === 'True') {
      if(select === 't') {
        return <MovieDisplay {...result} />
      } else {
        return result["Search"].map(result => <MoviePreviewDisplay {...result} />)
      }
    } else {
      return <p>We couldn't find a proper match. Please try again.</p>
    }
  }

  const handleSelect = (e) => {
    console.log(e.target.value)
    setSelect(e.target.value)
  }

  return (
    <div>
      <TextInput 
        type="text" 
        id="title" 
        value={title} 
        onChange={(e) => {
          console.log(e.target.value);
          setTitle(e.target.value);
        }}
        placeholder={"Enter the title of the movie"}
      />

      <Select
        options={[
          {
            value: '',
            text: 'Search By...'
          },
          {
            value: 't',
            text: 'Title'
          },
          {
            value: 's',
            text: 'Search'
          }
        ]}
        handleSelect={handleSelect}
      />

      <PrimaryButton text="Search" handleClick={() => makeMovieRequest(title)}/>

      {loading && (
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "5px solid",
            borderColor: "white #525a63 #525a63 #525a63",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      )}

      {result && result}

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
  );
};

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
  textAlign: "left",
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
      <img src={imgSrc} style={imageStyle} />
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
        <img src={imgSrc} style={imageStyle} />
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

//<MovieDisplay {...{ Poster: "https://m.media-amazon.com/images/M/MV5BNTc1ZWY0ZTEtZTVmNi00MTg0LTg4NmQtZTI4OWNiMmQ0MWZkXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"}}/>
ReactDOM.render(<App />, document.getElementById("root"));



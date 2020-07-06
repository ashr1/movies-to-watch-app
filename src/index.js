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

const fetchMovies = (title, select) => {
  const URL = url + `${select}=` + encodeURIComponent(title);
  console.log(URL);
  return fetch(URL).then((response) => response.json());
};

// fetchMovies('like water for chocolate')

// {movie && select === 't' && <MovieDisplay {...movie} />}
//       {movie && select === 's' && (
//         movie["Search"].map(movie => <MoviePreviewDisplay {...movie} />)
//       ) }

const App = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [select, setSelect] = useState("")
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
      <div>
        <label htmlFor={title}>Title: </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            console.log(e.target.value);
            setTitle(e.target.value);
          }}
          placeholder={"Enter the title of the movie"}
        />
      </div>
      <div>
        <label>Parameter:</label>
        <select value={select} onChange={handleSelect}>
          <option value="" disabled={true}>---</option>
          <option value="t">t</option>
          <option value="s">s</option>
        </select>
      </div>

      <div>
        <button id="search" onClick={() => makeMovieRequest(title)}>
          Search
        </button>
      </div>

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



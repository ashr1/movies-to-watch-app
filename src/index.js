import React, { useState } from "react";
import ReactDOM from "react-dom";

const API_KEY = "";
const url = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

// encodeURIComponent(title)

const fetchMovies = (title) => {
  const URL = url + "t=" + encodeURIComponent(title);
  console.log(URL)
  return fetch(URL)
    .then((response) => response.json())
};

// fetchMovies('like water for chocolate')

const App = () => {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState(null)

  const makeMovieRequest = () => {
    setLoading(true)
    fetchMovies(title)
    .then(movie => {
      setLoading(false)
      setMovie(movie)
    })
  }

  return (
    <div>
      <div>
        <label htmlFor={title}>Title: </label>
      <input 
      id="title"
      type="text" 
      value={title}
      onChange={e => { console.log(e.target.value); setTitle(e.target.value) }}
      placeholder={"Enter the title of the movie"}
      />
      </div>

      <div>
        <button
        id="search"
        onClick={() => makeMovieRequest(title)} 
        >Search</button>
      </div>

      {
        loading && (
          <div style={{ 
            width: '40px',
            height: '40px',
            border: '5px solid',
            borderColor: 'white #525a63 #525a63 #525a63',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        )
      }

      {
        movie && <MovieDisplay {...movie} />
      }

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
}

const movieContainerStyle = {
  color: "black",
  fontFamily: "monospace",
  maxWidth: '310px'
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
// title releasedYear length
// rated and genre
const MovieDisplay = ({ 
  Poster : imgSrc,
  Title: title, 
Actors: actors,
Director: director,
Genre: genre,
Runtime: runtime,
Rated: rated,
Released: released,
imdbRating,
Plot: plot
}) => {
  const altImgSrc =
    "https://via.placeholder.com/150.jpg/000000/FFFFFF/?text=Movie+Poster";
  // const title = "Hellboy";
  // const actors = "Ron Perlman, John Hurt, Selma Blair, Rupert Evans";
  // const director = "Guillermo del Toro";
  // const genre = "Action, Fantasy, Horror";
  // const runtime = "122 min";
  // const rated = "PG-13";
  // const released = "02 Apr 2004".slice(-4);
  // const imdbRating = "6.8";
  // const plot =
  //   "A demon, raised from infancy after being conjured by and rescued from the Nazis, grows up to become a defender against the forces of darkness.";
  return (
    <div style={movieContainerStyle}>
      {title && <p style={titleStyle}>{title}</p>}
      {rated && (
        <p style={titleAssistStyle}>
          {" "}
          <span style={titleSubStyle}>{released.slice(-4)}</span> {runtime}{" "}
          <span>{rated}</span>
        </p>
      )}
      <div>
        <div>
          <img src={imgSrc ? imgSrc : altImgSrc} style={imageStyle} />
        </div>
        
      </div>
      <div>
          {genre && <p style={{ fontWeight: 'bold' }}>{genre}</p>}
          {plot && <p>{plot}</p>}
        </div>
      <div>
        
        <div>
        {director && <p><span style={{ fontWeight: 'bold' }}>Directed By:</span> {director}</p>}
      {actors && <p><span style={{ fontWeight: 'bold' }}>Actors:</span> {actors}</p>}
        </div>
        
      </div>
      <div style={{ display: 'inline-block', marginTop: '10px'}}>
            <span style={{ display: 'block', fontSize: '25px'}}>{imdbRating}</span>
            <span>imdbRating</span>
        </div>
      

      
    </div>
  );
};
//<MovieDisplay {...{ Poster: "https://m.media-amazon.com/images/M/MV5BNTc1ZWY0ZTEtZTVmNi00MTg0LTg4NmQtZTI4OWNiMmQ0MWZkXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"}}/>
ReactDOM.render(<App />, document.getElementById("root"));

// Actors: "Min-sik Choi, Ji-Tae Yoo, Hye-jeong Kang, Dae-han Ji"
// Awards: "40 wins & 18 nominations."
// BoxOffice: "$637,778"
// Country: "South Korea"
// DVD: "23 Aug 2005"
// Director: "Chan-wook Park"
// Genre: "Action, Drama, Mystery, Thriller"
// Language: "Korean"
// Metascore: "77"
// Plot: "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days."
// Poster: "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg"
// Production: "Tartan Films"
// Rated: "R"
// Ratings: Array(3)
// 0: {Source: "Internet Movie Database", Value: "8.4/10"}
// 1: {Source: "Rotten Tomatoes", Value: "82%"}
// 2: {Source: "Metacritic", Value: "77/100"}
// length: 3
// __proto__: Array(0)
// Released: "21 Nov 2003"
// Response: "True"
// Runtime: "120 min"
// Title: "Oldboy"
// Type: "movie"
// Website: "N/A"
// Writer: "Garon Tsuchiya (story), Nobuaki Minegishi (comic), Chan-wook Park (character created by: Oldboy,  Vengeance Trilogy), Chan-wook Park (screenplay), Joon-hyung Lim (screenplay), Jo-yun Hwang (screenplay)"
// Year: "2003"
// imdbID: "tt0364569"
// imdbRating: "8.4"
// imdbVotes: "495,869"

// Actors: "Ron Perlman, John Hurt, Selma Blair, Rupert Evans"
// Awards: "3 wins & 23 nominations."
// BoxOffice: "$59,035,104"
// Country: "USA"
// DVD: "27 Jul 2004"
// Director: "Guillermo del Toro"
// Genre: "Action, Fantasy, Horror"
// Language: "English, Russian"
// Metascore: "72"
// Plot: "A demon, raised from infancy after being conjured by and rescued from the Nazis, grows up to become a defender against the forces of darkness."
// Poster: "https://m.media-amazon.com/images/M/MV5BNTc1ZWY0ZTEtZTVmNi00MTg0LTg4NmQtZTI4OWNiMmQ0MWZkXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
// Production: "Sony Pictures"
// Rated: "PG-13"
// Ratings: (3) [{…}, {…}, {…}]
// Released: "02 Apr 2004"
// Response: "True"
// Runtime: "122 min"
// Title: "Hellboy"
// Type: "movie"
// Website: "N/A"
// Writer: "Guillermo del Toro (screenplay), Guillermo del Toro (screen story), Peter Briggs (screen story), Mike Mignola (comic books)"
// Year: "2004"
// imdbID: "tt0167190"
// imdbRating: "6.8"
// imdbVotes: "301,177"
// __proto__: Object

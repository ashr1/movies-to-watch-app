import React from "react";
import ReactDOM from "react-dom";

const API_KEY = "";
const url = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const fetchMovies = (title) => {
  const URL = url + "t=" + title;
  fetch(URL)
    .then((response) => response.json())
    .then((parsedResponse) => console.log(parsedResponse));
};

// fetchMovies('spiderman')
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
const MovieDisplay = () => {
  const altImgSrc =
    "https://via.placeholder.com/150.jpg/000000/FFFFFF/?text=Movie+Poster";
  const imgSrc =
    "https://m.media-amazon.com/images/M/MV5BNTc1ZWY0ZTEtZTVmNi00MTg0LTg4NmQtZTI4OWNiMmQ0MWZkXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg";
  const title = "One Flew Over the Coocos Nest";
  const actors = "Ron Perlman, John Hurt, Selma Blair, Rupert Evans";
  const director = "Guillermo del Toro";
  const genre = "Action, Fantasy, Horror";
  const runtime = "122 min";
  const rated = "PG-13";
  const released = "02 Apr 2004".slice(-4);
  const imdbRating = "6.8";
  const plot =
    "A demon, raised from infancy after being conjured by and rescued from the Nazis, grows up to become a defender against the forces of darkness.";
  return (
    <div style={movieContainerStyle}>
      {title && <p style={titleStyle}>{title}</p>}
      {rated && (
        <p style={titleAssistStyle}>
          {" "}
          <span style={titleSubStyle}>{released}</span> {runtime}{" "}
          <span>{rated}</span>
        </p>
      )}
      <div>
        <div>
          <img src={imgSrc} style={imageStyle} />
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

ReactDOM.render(<MovieDisplay />, document.getElementById("root"));

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

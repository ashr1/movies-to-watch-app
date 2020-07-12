import React from "react";
import { movieContainerStyle, titleStyle, titleSubStyle, titleAssistStyle } from '../globalStyles/movieComponentStyles'
import ImageComponent, { imageStyle } from './ImageComponent'

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

  export default MoviePreviewDisplay
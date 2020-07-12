import React from "react";
import InteractiveSymbol, { InteractiveSymbolContainer } from './InteractiveSymbol'
import MovieDisplay from './MovieDisplay'
import MoviePreviewDisplay from './MoviePreviewDisplay'
import { MovieAppComponentStyles } from '../globalStyles/MovieAppComponentStyles'

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

export const MovieDisplayApp = MovieDisplayAppComponent(MovieDisplay)
export const MovieDisplayPreviewApp = MovieDisplayAppComponent(MoviePreviewDisplay)

export default MovieDisplayAppComponent
  

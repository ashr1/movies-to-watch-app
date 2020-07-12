import React from "react";
import MoviePreviewDisplay from './MoviePreviewDisplay'
import InteractiveSymbol, { InteractiveSymbolContainer } from './InteractiveSymbol'
import { MovieAppComponentStyles } from '../globalStyles/MovieAppComponentStyles'

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

  export default UserMovieDisplayAppComponent
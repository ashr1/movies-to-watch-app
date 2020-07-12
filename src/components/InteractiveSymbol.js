import React from "react";

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
  
  export const InteractiveSymbolContainer = ({ children }) => (
    <p style={AddRemoveStyle}>
      { children }
    </p>
  )

  export default InteractiveSymbol
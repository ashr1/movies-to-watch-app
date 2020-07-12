import React from "react";

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
  
  export const PrimaryButton = (props) => (
    <Button 
      {...props}
      style={ButtonStyle}
    />
  )

export default Button;
  
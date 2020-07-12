import React from "react";

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

  export default RadioButton
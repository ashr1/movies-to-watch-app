import React from "react";

const YearInputContainerStyle = {
    width: '300px',
    fontFamily: 'monospace',
    color: '#584f4f',
    margin: '10px',
  }
  
  const YearInputStyle = {
    borderWidth: '0 0 1px 0',
    fontFamily: 'monospace',
    borderColor: '#cdd7e5',
    color: '#584f4f',
    outline: 'none',
    backgroundImage: 'initial',
    backgroundColor: 'transparent'
  }
  
  const YearInput = ({ 
    name, 
    value, 
    handleChange, 
    label, 
    id, 
    max,
    min,
    step,
  }) => {
    return (
      <div style={YearInputContainerStyle}>
        {label && <label htmlFor={id}>{label}</label>}
        <input 
          name={name}
          id={id}
          type='number'
          value={value}
          max={max}
          min={min}
          step={step}
          onChange={handleChange}
          style={YearInputStyle}
        />
      </div>
    )
  }

  export default YearInput
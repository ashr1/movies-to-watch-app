import React from "react";

const SelectStyle = {
    borderWidth: '0 0 1px 0',
    borderColor: '#cdd7e5',
    outline: 'none',
    
    color: '#584f4f'
  }
  
  const SelectContainer = {
    width: '300px',
    fontFamily: 'monospace',
    color: '#584f4f',
    margin: '10px',
  }
  
  const Select = ({ id, label, options, value, handleSelect }) => {
    return (
      <div style={SelectContainer}>
        <label htmlFor={id}>{label} </label>
        <select id={id} value={value} onChange={handleSelect} style={SelectStyle}>
          {
            options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)
          }
        </select>
      </div>
    )
  }

  export default Select;
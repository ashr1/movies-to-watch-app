import React from "react";

const Input = ({ name, value, handleChange, type, ...rest }) => {
    return (
      <div>
        <input 
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </div>
    )
  }
  
  // preventing the default input background highlight:
  // add !important to color
  // add background-image: initial !important
  // add background-color: transparent !important
  const TextInputStyle = {
    borderWidth: '0 0 1px 0',
    fontFamily: 'monospace',
    borderColor: '#cdd7e5',
    color: '#584f4f',
    outline: 'none',
    width: '300px',
    margin: '10px',
    backgroundImage: 'initial',
    backgroundColor: 'transparent'
  }
  
  const TextInput = (props) => <Input {...props} type="text" style={TextInputStyle} />
  const NumberInput = ({ max, min, step, ...rest  }) => <Input {...rest} max={max} min={min} step={step ? step : 1} type="number" style={TextInputStyle} />
  

  export { TextInput, NumberInput }
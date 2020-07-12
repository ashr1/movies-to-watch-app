import React, { useState } from "react"
import { ErrorMsgStyle } from '../globalStyles/generalStyles'
import { TextInput } from './Input'
import Select from './Select'
import YearInput from './YearInput'
import { PrimaryButton } from './Button'

const SpecificMovieForm = ({ handleSubmit, onFormChange }) => {
    const [i, setI] = useState('')
    const [t, setT] = useState('')
    const [type, setType] = useState('')
    const [year, setYear] = useState('')
    const [plot, setPlot] = useState('short')
    const [error, setError] = useState('')
    //const [loading, setLoading] = useState(false)
    // const [movieData, setMovieData] = useState(null)
  
    const submitForRequest = () => {
      if(i || t) {
        const queryParams = {
          i,
          t,
          type,
          y: year,
          plot
        }
        handleSubmit(queryParams)
      } else {
        setError('You must specify either an id or title. Both are not required.')
      } // form validation
    }
  
    const handleInput = (e) => {
      setError('')
      onFormChange()
      switch(e.target.id) {
        case 't':
          console.log(e.target.id);
          setT(e.target.value);
          break;
        case 'i':
          console.log(e.target.id);
          setI(e.target.value);
          break;
        case 'type':
          console.log(e.target.id);
          setType(e.target.value);
          break;
        case 'plot':
          console.log(e.target.id);
          setPlot(e.target.value);
          break;
        case 'year':
          console.log(e.target.id);
          setYear(e.target.value);
          break;
        default:
          break;
      }
    }
  
    return (
      <div>
        <TextInput 
          id="t" 
          value={t} 
          handleChange={handleInput}
          placeholder={"Enter the title of the movie"}
        />
        <TextInput 
          id="i" 
          value={i} 
          handleChange={handleInput}
          placeholder={"Enter the imdbID of the movie"}
        />
        <Select
          id='type'
          label='Search By: '
          options={[
            {
              value: '',
              text: 'Default'
            },
            {
              value: 'movie',
              text: 'Movie'
            },
            {
              value: 'series',
              text: 'Series'
            },
            {
              value: 'episode',
              text: 'Episode'
            }
          ]}
          value={type}
          handleSelect={handleInput}
        />
        
        <YearInput 
          id='year'
          label='Year: '
          value={year}
          min={1000} 
          max={3000} 
          step={200}
          handleChange={handleInput}
        />
        <Select
          id='plot'
          label='Plot: '
          options={[
            {
              value: 'short',
              text: 'Short'
            },
            {
              value: 'full',
              text: 'Full'
            },
          ]}
          value={plot}
          handleSelect={handleInput}
        />
        <PrimaryButton text="Search" handleClick={() => submitForRequest()}/>
        { error && <p style={ErrorMsgStyle}>{error}</p>}
      </div>
    )
  }

  export default SpecificMovieForm
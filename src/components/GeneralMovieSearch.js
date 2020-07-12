import React, { useState } from "react"
import { ErrorMsgStyle } from '../globalStyles/generalStyles'
import { TextInput } from './Input'
import Select from './Select'
import YearInput from './YearInput'
import { PrimaryButton } from './Button'

const GeneralMovieSearch = ({ handleSubmit, onFormChange }) => {
    const [s, setS] = useState('')
    const [type, setType] = useState('')
    const [year, setYear] = useState('')
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)
    // const [movieData, setMovieData] = useState(null)
  
    const submitForRequest = () => {
      if(s) {
        const queryParams = {
          s,
          type,
          y: year,
          page
        }
        handleSubmit(queryParams)
      } else {
        setError('You must specify the title.')
      } // form validation
    }
  
    const handleInput = (e) => {
      setError('')
      onFormChange()
      switch(e.target.id) {
        case 's':
          console.log(e.target.id);
          setS(e.target.value);
          break;
        case 'type':
          console.log(e.target.id);
          setType(e.target.value);
          break;
        case 'page':
          console.log(e.target.id);
          setPage(e.target.value);
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
          id="s" 
          value={s} 
          handleChange={handleInput}
          placeholder={"Enter the title of the movie"}
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

        <YearInput 
          id='page'
          label='Page: '
          value={page}
          min={1} 
          max={100} 
          step={1}
          handleChange={handleInput}
        />

        <PrimaryButton text="Search" handleClick={() => submitForRequest()}/>
        { error && <p style={ErrorMsgStyle}>{error}</p>}

      </div>
    )
  }

  export default GeneralMovieSearch
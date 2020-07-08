{/* <div>
        <input
          type="radio"
          id="specMovieForm"
          name="movieForm"
          checked={specificMovie}
          onChange={() => setSpecificMovie(true)}
        />
        <label htmlFor="specMovieForm">Specific Movie</label>
        <input
          type="radio"
          id="generalMovieForm"
          name="movieForm"
          checked={!specificMovie}
          onChange={() => setSpecificMovie(false)}
        />
        <label htmlFor="generalMovieForm">General Movies</label>
      </div> */}


// { movieData && movieData["Search"].map((result, index) => <MoviePreviewDisplay key={index} {...result} />) }

//<MovieDisplay {...{ Poster: "https://m.media-amazon.com/images/M/MV5BNTc1ZWY0ZTEtZTVmNi00MTg0LTg4NmQtZTI4OWNiMmQ0MWZkXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"}}/>
// const fetchMovies = (title, select) => {
//   const URL = url + `${select}=` + encodeURIComponent(title);
//   console.log(URL);
//   return fetch(URL).then((response) => response.json());
// };

// const App = () => {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [movie, setMovie] = useState(null);
//   const [select, setSelect] = useState('t')
//   const [result, setResult] = useState(null)
// //TODO: build search parameters based on input
//   const makeMovieRequest = () => {
//     if(select && title) {
//       setLoading(true);
//     fetchMovies(title, select).then((movie) => {
//       setLoading(false);
//       setMovie(movie);
//       setResult(prevState => movieItemToDisplay(movie))
//     });
//     } 
//     //TODO: add message for field missing
//     // else {
//     //   setResult(<p>Please input missing fields.</p>)
//     // }
//   };

//   const movieItemToDisplay = (result) => {
//     if(result["Response"] === 'True') {
//       if(select === 't') {
//         return <MovieDisplay {...result} />
//       } else {
//         return result["Search"].map((result, index) => <MoviePreviewDisplay key={index} {...result} />)
//       }
//     } else {
//       return <p>We couldn't find a proper match. Please try again.</p>
//     }
//   }

//   const handleSelect = (e) => {
//     console.log(e.target.value)
//     setSelect(e.target.value)
//   }

//   return (
//     <div>
//       <TextInput 
//         type="text" 
//         id="title" 
//         value={title} 
//         onChange={(e) => {
//           console.log(e.target.value);
//           setTitle(e.target.value);
//         }}
//         placeholder={"Enter the title of the movie"}
//       />

//       <Select
//         id='searchByMethod'
//         label='Search By: '
//         options={[
//           {
//             value: 't',
//             text: 'Title'
//           },
//           {
//             value: 's',
//             text: 'Search'
//           }
//         ]}
//         value={select}
//         handleSelect={handleSelect}
//       />

//       <PrimaryButton text="Search" handleClick={() => makeMovieRequest(title)}/>

//       {loading && (
//         <div
//           style={{
//             width: "40px",
//             height: "40px",
//             border: "5px solid",
//             borderColor: "white #525a63 #525a63 #525a63",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//           }}
//         ></div>
//       )}

//       <h1>Specific Movie Form</h1>
//       <SpecificMovieForm />

//       {result && result}

//       <style>
//         {`
//           @keyframes spin{
//             0%{
//               transform: rotate(0deg);
//             }
//             100%{
//               transform: rotate(360deg);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };
 
 
 
 {/* <TextInput 
        id='year'
        value={year} 
        placeholder={'Enter the year (Optional)'} 
        handleChange={handleInput}
      /> */}
 
 {/* <NumberInput value={someVariable} min={0} max={100} handleChange={e => console.log(e.target.value)}/> */}
  
  // const handleSelect = (e) => {
  //   switch(e.target.id) {
  //     case 'type':
  //       setType(e.target.value);
  //       break;
  //     case 'plot':
  //       setPlot(e.target.value);
  //       break;
  //     default:
  //       break;
  //   } // for the specificMovieForm
  // } 
// {
//   value: '',
//   text: 'Search By...'
// },

//   <div>
//   <label htmlFor={title}>Title: </label>
//   <input
//     id="title"
//     type="text"
//     value={title}
//     onChange={(e) => {
//       console.log(e.target.value);
//       setTitle(e.target.value);
//     }}
//     placeholder={"Enter the title of the movie"}
//   />
// </div>

{/* <div>
        <button id="search" onClick={() => makeMovieRequest(title)}>
          Search
        </button>
      </div> */}

      {/* <div>
        <label>Parameter:</label>
        <select value={select} onChange={handleSelect}>
          <option value="t">t</option>
          <option value="s">s</option>
        </select>
      </div> */}

      
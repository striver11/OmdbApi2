import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OmdbApi = () => {
  const [state, setState] = useState(null);
  const [state2, setState2] = useState({ name: "movie" });
  const [newstate, setNewState] = useState(state2.name);

  function handleChange(e) {
    setState2((prevState) => {
      if (e.target.name === "name") {
        return { ...prevState, name: e.target.value };
      }
    });
  }

  function handleSubmit(e) {
    setNewState(state2.name);
    e.preventDefault();
  }

  useEffect(() => {
    console.log(newstate, "this is the movie");
    axios
      .get(`https://www.omdbapi.com/?s=${newstate}&apikey=3b5ae73e`)
      .then((res) => {
        if (res.data.Response === "True") {
          setState(res.data);
        } else {
          setState({ Search: [] }); // Handling the case when no results are found
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setState({ Search: [] });
      });
  }, [newstate]);

  return (
    <>
      <form className="reg-form py-5" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
          <div className="input-group mb-1" style={{ width: "500px" }}>
            <input name="name" type="text" className="form-control" placeholder="Enter Movie name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} />
            <button type="submit" className="btn btn-outline-secondary" id="button-addon2">Search</button>
          </div>
        </div>
      </form>

      <h1 className="text-center py-3" style={{ color: "white" }}>Movies</h1>

      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto", rowGap: "20px" }}>
        {state === null ? (
          <p>Loading...</p>
        ) : state.Search && state.Search.length === 0 ? (
          <div style={{ color: 'red', textAlign: 'center', width: '100%' }}>
           <h3> No results found.</h3>
          </div>
        ) : (
          state.Search && state.Search.map((user) => (
            <div className='card text-center' style={{ width: "16rem" }} key={user.imdbID}>
              <img src={user.Poster} className='card-img-top' alt="" />
              <div className='card-body'>
                <h4 className='card-title' style={{ textTransform: "uppercase" }}>{user.Title}</h4>
                <h6>Year: {user.Year}</h6>
                <h6>Type: {user.Type}</h6>
                <h6>imdbID: {user.imdbID}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OmdbApi;

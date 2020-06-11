/*
* @Author: @vedatbozkurt
* @Date:   2020-05-29 01:03:09
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-29 03:05:06
*/
import React, { useState, useEffect  }  from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Index = () => {
    const [movies, setMovies] = useState("");

    useEffect(() => {
    getMovie();
}, []);

    const getMovie = () => {
        axios.get(`http://lavu.wedat.org/api/v1/movies`,{ headers: {
            'Access-Control-Allow-Origin': '*'
        }})
        .then((response) => {
         // console.log(response.data.data)
         setMovies(response.data.data)
     });
    }

   const deleteMovie = (movieid) => {
    axios.delete(`http://lavu.wedat.org/api/v1/movies/${movieid}`)
    .then(res => {
      // console.log(res.data)
      getMovie();
      // console.log('basarili')
    });
  }

    return (
      <div className="ArticleContainer">
      <div className="row justify-content-center p-5">
      <div className="col-lg-8 col-md-8 col-sm-8">
      <table className="table">
      <thead>
      <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Email</th>
      </tr>
      </thead>
      <tbody>
      {
        movies.length === 0 ?
        <tr><td>Loading Movies...</td></tr>
        :
        movies.map((movie, index) => (
          <tr key={index}>
          <td>
          <img height="100" src={"http://lavu.wedat.org/test/public/images/banner/"+movie.banner} alt={movie.name} />
          </td>
          <td>{movie.name}</td>
          <td>{movie.year}...</td>
          <td><button onClick={() => deleteMovie(movie.id)} className='btn btn-outline-warning'>Delete</button>
          <Link to={{pathname:`edit/${movie.id}`, state: {movie} }} className="btn btn-outline-primary">Edit</Link></td>
          </tr>

          ))
    }
    </tbody>
    </table>

    </div>
    </div>
    </div>
    );
};

export default Index;

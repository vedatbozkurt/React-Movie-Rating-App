/*
* @Author: @vedatbozkurt
* @Date:   2020-05-29 01:02:53
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-29 03:00:46
*/
import React, { useState, useEffect  } from 'react';
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import axios from 'axios';

const Edit = () => {
  let { id } = useParams();
  let history = useHistory();
  let data = useLocation();
  let movie = data.state.movie

  const [name, setName] = useState(movie.name);
  const [year, setYear] = useState(movie.year);
  const [banner, setBanner] = useState(movie.banner);
  const [bannerp, setBannerp] = useState(movie.banner);
  const [cover, setCover] = useState(movie.cover);
  const [vote, setVote] = useState(movie.vote);
  const [view, setView] = useState(movie.view);

  const handleName = e => {
    let name = e.target.value;
    setName(name);
  };

  const handleYear = e => {
    let year = e.target.value;
    setYear(year);
  };

  const handleBanner = e => {
    let banner = e.target.files[0];
    setBanner(banner);
  };

  const editMovie = () => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('banner', banner);
    formData.append('cover', cover);
    formData.append('vote', vote);
    formData.append('view', view);
    formData.append('previous_banner', bannerp);
    formData.append("_method", "put");

    let uri = `http://lavu.wedat.org/api/v1/movies/${id}`;
    axios.post(uri, formData, {headers: {"Content-Type": "multipart/form-data",'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
      console.log('success')
      history.push("/");
    });
    console.log('post edildi')
  }

  return (
   <div className="ArticleContainer">
   <div className="row justify-content-center p-5">
   <div className="col-lg-4 col-md-4 col-sm-8">
   <div className="card border-0 shadow">
   <div className="card-body">
   <h3 className="card-title text-center">Edit Movie</h3>
   <fieldset>
   <div className="form-group">
   <label> Name </label>
   <input
   type="text"
   className="form-control form-control-sm"
   value={name}
   onChange={handleName}
   />
   </div>
   <div className="form-group">
   <label> Year </label>
   <input
   type="text"
   className="form-control form-control-sm"
   value={year}
   onChange={handleYear}
   />
   </div>
   <div className="form-group">
   <label> Banner </label>
   <p><img height="100" src={"http://lavu.wedat.org/test/public/images/banner/"+movie.banner} alt={movie.name} /></p>
   <input
   type="file"
   className="form-control form-control-sm"
   onChange={handleBanner}
   />
   </div>
   <button onClick={editMovie} className="btn btn-primary btn-sm btn-block">
   Submit
   </button>
   </fieldset>
   </div>
   </div>
   </div>
   </div>
   </div>
   );
};

export default Edit;

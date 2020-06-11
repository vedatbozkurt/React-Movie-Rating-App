/*
* @Author: @vedatbozkurt
* @Date:   2020-05-29 01:02:45
* @Last Modified by:   @vedatbozkurt
* @Last Modified time: 2020-05-29 03:01:39
*/
import React, { useState } from "react";
import axios from 'axios';
import { Link, useHistory} from "react-router-dom";

const Add = () => {

  let history = useHistory();

  const [name, setName] = useState("1");
  const [year, setYear] = useState("1");
  const [banner, setBanner] = useState("aaa");
  const [cover, setCover] = useState("ccc");
  const [vote, setVote] = useState("1");
  const [view, setView] = useState("1");

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

const addMovie = () => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('banner', banner);
    formData.append('cover', cover);
    formData.append('vote', vote);
    formData.append('view', view);

    let uri = 'http://lavu.wedat.org/api/v1/movies';
    axios.post(uri, formData, {headers: {"Content-Type": "multipart/form-data",'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
      console.log(response.data)
      history.push("/");
  })
    .catch(error => {
      alert(error)
  });
}
return (
 <div className="ArticleContainer">
 <div className="row justify-content-center p-5">
 <div className="col-lg-4 col-md-4 col-sm-8">
 <div className="card border-0 shadow">
 <div className="card-body">
 <h3 className="card-title text-center">Add New Movie</h3>
 <fieldset>
 <div className="form-group">
 <label> Name </label>
 <input
 type="text"
 className="form-control form-control-sm"
 onChange={handleName}
 />
 </div>
 <div className="form-group">
 <label> Year </label>
 <input
 type="text"
 className="form-control form-control-sm"
 onChange={handleYear}
 />
 </div>
 <div className="form-group">
 <label> Banner </label>
 <input
 type="file"
 className="form-control form-control-sm"
 onChange={handleBanner}
 />
 </div>
 <button onClick={addMovie} className="btn btn-primary btn-sm btn-block">
 Submit
 </button>
 </fieldset>
 </div>
 </div>
 </div>
 </div>
 </div>
 )
};

export default Add;

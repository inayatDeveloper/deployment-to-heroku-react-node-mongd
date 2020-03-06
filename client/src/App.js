import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const App = () => {
  const [searchGetData, searchSetData] = useState(null);
  const Search = e => {
    axios
      .post(
        "http://localhost:4000/search",
        { search: e.target.value },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        if (res.data.success) {
          searchSetData(res.data.data);
        }
      })
      .catch(error => {
        console.log("errorr", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="search from algolia"
              onChange={Search}
            />
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="searchResultDiv">
              {searchGetData && searchGetData.Users.length > 0 ? (
                <label>Users </label>
              ) : (
                ""
              )}
              {searchGetData
                ? searchGetData.Users.map(user => <h6>{user.firstName}</h6>)
                : ""}

              {searchGetData && searchGetData.Users.length > 0 ? (
                <label>Articles</label>
              ) : (
                ""
              )}
              {searchGetData
                ? searchGetData.Articles.map(article => (
                    <h6>{article.title}</h6>
                  ))
                : ""}
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default App;

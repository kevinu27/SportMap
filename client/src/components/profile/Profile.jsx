import React, { useState, useEffect } from "react";

import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";

export function Profile(props) {
  const [userData, setUserData] = useState({});
  const getAllUsers = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    if (!props.loggedUser) {
      return;
    }
    const baseURL = `http://localhost:5000/api/profile/${props.loggedUser._id}`;
    getAllUsers.get(baseURL).then((usersFromDatabase) => {
      setUserData(usersFromDatabase.data);
    });
  }, [props.loggedUser]);

  const HandleUpdateFormSubmit = (e) => {
    e.preventDefault();
    console.log("click en el boton de update");
  };

  return (
    <>
      <h1>Profile</h1>
      <div className="inputField">
        <input></input>
        <p> {userData.name}</p>
      </div>
      <p> {userData.email}</p>
      <form onSubmit={HandleUpdateFormSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={userData.name}
          ></input>
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={userData.email}
          ></input>
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          ></input>
        </div>

        <button type="submit" class="btn btn-primary">
          UPDATE
        </button>
      </form>
    </>
  );
}

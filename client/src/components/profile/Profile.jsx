import React, { useState, useEffect } from "react";

import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";

export function Profile(props) {
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const [userData, setUserData] = useState({});
  const getUserProfile = axios.create({
    withCredentials: true,
  });
  const updateUserProfile = axios.create({
    withCredentials: true,
  });

  const handleInputChangeUsername = (e) => {
    setUpdateName(e.target.value);
  };
  const handleInputChangeEmail = (e) => {
    setUpdateEmail(e.target.value);
  };

  useEffect(() => {
    if (!props.loggedUser) {
      return;
    }
    const baseURL = `http://localhost:5000/api/profile/${props.loggedUser._id}`;
    getUserProfile.get(baseURL).then((usersFromDatabase) => {
      setUserData(usersFromDatabase.data);
    });
  }, [props.loggedUser]);

  const HandleUpdateFormSubmit = (e) => {
    const baseURL = `http://localhost:5000/api/profile/${props.loggedUser._id}`;
    e.preventDefault();
    console.log("click en el boton de update");
    updateUserProfile
      .put(baseURL, { name: updateName, email: updateEmail })
      .then((userFromDatabase) => {
        console.log("userFromDatabase", userFromDatabase);
      });
  };

  return (
    <>
      <h1>Profile</h1>
      {/* <div className="inputField">
        <p> {userData.name}</p>
      </div>
      <p> {userData.email}</p> */}
      <form onSubmit={HandleUpdateFormSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={userData.name}
            onChange={handleInputChangeUsername}
            value={updateName}
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
            onChange={handleInputChangeEmail}
            value={updateEmail}
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

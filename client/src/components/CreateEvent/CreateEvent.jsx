import React, { useState, useEffect } from "react";
import { MapToSetMarker } from "../Map/MapToSetMarker";
import "./CreateEvent.css";
import axios from "axios";

export function CreateEvent(props) {
  const [sportName, setSportName] = useState("");

  const createEventAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/event/newEvent`;

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    console.log("HandleFormSubmit");
    createEventAxios.post(baseURL, { sportName }).then((response) => {
      //   console.log("response");
      //   setName("");
      //   setPwd("");
      //   setEmail("");
      //   props.setModalOpenSignUp(false);
      /// setstate de un div que ponga mensaje de conectado con exito
    });
  };

  const handleInputSportName = (e) => {
    setSportName(e.target.value);
    console.log(sportName);
  };

  return (
    <>
      <h1>Create Event</h1>

      <div className="inputField">
        {/* <input></input> */}
        {/* <p> {userData.name}</p> */}
      </div>
      {/* <p> {userData.email}</p> */}
      <form onSubmit={HandleFormSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Sport</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            // placeholder={userData.name}
            onChange={handleInputSportName}
            // value={updateName}
          ></input>
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Description</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            // placeholder={userData.email}
            // onChange={handleInputChangeEmail}
            // value={updateEmail}
          ></input>
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Number of players needed</label>
          <input
            type="number"
            class="form-control"
            id="exampleInputPassword1"
            // placeholder="Password"
          ></input>
        </div>

        <MapToSetMarker />

        <button type="submit" class="btn btn-primary">
          Create Event
        </button>
      </form>
    </>
  );
}

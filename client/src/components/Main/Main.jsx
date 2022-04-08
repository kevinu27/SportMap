import "./Main.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Header } from "../Header/Header";
import { Map } from "../Map/Map";

import Button from "react-bootstrap/Button";
import { Profile } from "../profile/Profile";

export function Main(props) {
  //////////////////////////////////////////////////////////////////////////////////////Return/////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div>
        <Map />
      </div>
    </>
  );
}

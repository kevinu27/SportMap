import React, { useState, useEffect } from "react";

import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export function Profile(props) {
  const [userMatches, setUserMatches] = useState([]);
  const [userData, setUserData] = useState({});
  const [loggedUserID, setLoggedUserID] = useState(props.loggedUser._id);

  const getAllUsers = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/profile/${loggedUserID}`;

  const getUsers = () => {
    console.log("llamada al getUser");
  };

  useEffect(() => {
    console.log("loggedUser---", props.loggedUser._id);
    getAllUsers.get(baseURL).then((usersFromDatabase) => {
      // setUserData(usersFromDatabase.data);
      console.log("userData", userData);
      console.log("usersFromDatabase.data", usersFromDatabase.data);
      setUserData(usersFromDatabase.data);
    });
  }, []);

  console.log("userData", userData.name);

  return (
    <>
      <h1>Profile</h1>
      <p> {userData.name}</p>
      <p> {userData.email}</p>

      <Row>
        <Col md={{ span: 12, offset: 0 }}>
          <h1>Login</h1>

          <hr></hr>

          <Form onSubmit={getUsers}>
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                // value={name}
                // onChange={handleInputChangeUsername}
                name="name"
              />
            </Form.Group>

            <Form.Group controlId="pwd">
              <Form.Label>
                <p>Password</p>
              </Form.Label>
              <Form.Control
                type="password"
                // value={pwd}
                // onChange={handleInputChangePwd}
                name="pwd"
              />
            </Form.Group>

            <Button
              style={{ marginTop: "10%", width: "50%", marginBottom: "10%" }}
              variant="dark"
              type="submit"
            >
              Login
            </Button>
          </Form>

          {/* <Link to="/"> */}
          {/* <Button variant="dark">Volver</Button> */}
          {/* </Link> */}
        </Col>
      </Row>
    </>
  );
}

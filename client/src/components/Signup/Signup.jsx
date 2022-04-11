import { Component, useState, useEffect } from "react";
import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

function Signup(props) {
  const signupAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/signup`;

  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChangeUsername = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleInputChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(pwd);
  };

  const handleInputChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();

    signupAxios.post(baseURL, { name, pwd, email }).then((response) => {
      console.log("response");
      setName("");
      setPwd("");
      setEmail("");
      props.setModalOpenSignUp(false);
      /// setstate de un div que ponga mensaje de conectado con exito
    });
  };

  return (
    <Row>
      <Col md={{ span: 12, offset: 0 }}>
        <h1>SignUp</h1>

        <hr></hr>

        <Form onSubmit={HandleFormSubmit}>
          <Form.Group controlId="name">
            <Form.Label>User</Form.Label>
            <Form.Control
              type="text"
              onChange={handleInputChangeUsername}
              value={name}
              name="name"
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={handleInputChangeEmail}
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="pwd">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={pwd}
              onChange={handleInputChangePwd}
              name="pwd"
            />
          </Form.Group>

          <Button
            style={{ marginTop: "10%", width: "50%", marginBottom: "10%" }}
            variant="dark"
            type="submit"
          >
            SignUp
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Signup;

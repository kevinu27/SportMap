import React from "react";
import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

function Login(props) {
  const loginAxios = axios.create({
    withCredentials: true,
  });
  const baseURL = `http://localhost:5000/api/login`;

  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const handleInputChangeUsername = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleInputChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(pwd);
  };

  const HandleFormSubmit = (e) => {
    e.preventDefault();

    loginAxios.post(baseURL, { name, pwd }).then((loggedUserfromServer) => {
      console.log("Login");
      props.storeUser(loggedUserfromServer.data);
      console.log(
        "loggedUserfromServer.data.name",
        loggedUserfromServer.data.name
      );
      setName("");
      setPwd("");
      props.setLoggedUserName(loggedUserfromServer.data.name);

      props.setModalOpenLogin(false);
      document.cookie = JSON.stringify(loggedUserfromServer);
      console.log("cookie", document.cookie);
      /// setstate de un div que ponga mensaje de conectado con exito
    });
  };

  return (
    <>
      <div>
        <Row>
          <Col md={{ span: 12, offset: 0 }}>
            <h1>Login</h1>

            <hr></hr>

            <Form onSubmit={HandleFormSubmit}>
              <Form.Group controlId="name">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleInputChangeUsername}
                  name="name"
                />
              </Form.Group>

              <Form.Group controlId="pwd">
                <Form.Label>
                  <p>Password</p>
                </Form.Label>
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
                Login
              </Button>
            </Form>

            {/* <Link to="/"> */}
            {/* <Button variant="dark">Volver</Button> */}
            {/* </Link> */}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;

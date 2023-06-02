import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Button, Col, Form, Row } from "react-bootstrap";
import StoreContext from '../../ContextApi';
import { useNavigate } from "react-router-dom";
import { Url } from "../Core/index";
import Kicon from '../../Component/assets/K-icon.png';


function simulateNetworkRequest() { //
  return new Promise((resolve) => setTimeout(resolve, 2000));
}


function Login() { // login funcation

  const [isLoading, setLoading] = useState(false);
  const RoleDetails = useContext(StoreContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const email = useRef()
  const password = useRef()


  const handleClick = () => {
    setLoading(true)

    axios({
      method: "post",
      url: Url+"/auth/login",
      data: {
        email: email.current.value,
        password: password.current.value,
      }
    }).then((res) => {
      // console.log(res.data.Role);
      localStorage.setItem("Role", JSON.stringify(res.data.Role))
      alert("Login Successfully!")
      navigate('/dashboard');
      RoleDetails.setUserData(res.data)
    }).catch((err) => {
      // console.log(err.message, "employee not found");
    alert("incorrect credentials")
    })

  };


  return (
    <div>
      <Container>

        <h1 className="shadow-lg p-3 mb-5 bg-white rounded p-3 text-center" style={{color:"#427d8f"}}>Admin Login</h1>
        <Row className="mt-5">
          <Col lg={5} md={6} sm={12} className="shadow-lg p-3 mb-5 bg-white rounded p-4 m-auto  " >
            <h3 className='text-center'style={{color:"#427d8f"}}><img src={Kicon} height={80} />Kollectlt Dahboard</h3>
            <br />

            <Form
            >

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} />
                
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={password} />
              </Form.Group>


              <Button style={{backgroundColor:"#427d8f"}}
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}>

                {isLoading ? 'Loading…' : 'Click to Login'}
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Login
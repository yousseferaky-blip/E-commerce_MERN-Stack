import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { LOGIN, BASE_URL } from "../../components/api/Api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import  "./Signin.css";
import { setToken } from "../../components/require/GetToken";


const Signin = () => {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${BASE_URL}/${LOGIN}`, form);
  
      const token = res.data.token;

      setToken(token)
      toast(`Logged successfully `);
      Navigate("/", { replace: true });
    } catch (err) {
      if (err) {
        toast.error(" Please try again.");
      } 
    }
  };

  return (
      <Container className="container">
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                  type="email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  type="password"
                  required
                />
              </Form.Group>
              <Button className="btn"  type="submit">
                Log in
              </Button>
              <p>Don't have an account?
                <Link to="/signup" className="signUp">SignUp Now</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default Signin;

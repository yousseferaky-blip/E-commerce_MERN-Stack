import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, REGISTER } from "../../components/api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { setToken } from "../../components/require/GetToken";

const Signup = () => {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // تم إضافة هذا الحالة لتتبع حالة إرسال الطلب

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);
  
    if (form.password.length < 6) {
      setIsPasswordValid(false);
      setIsSubmitting(false);
      return;
    } else {
      setIsPasswordValid(true);
    }
  
    if (form.firstName.length < 3 || form.lastName.length < 3) {
      setIsNameValid(false);
      setIsSubmitting(false);
      return;
    } else {
      setIsNameValid(true);
    }
  
    try {
      let res = await axios.post(`${BASE_URL}/${REGISTER}`, form);
      const token = res.data.data.token;

      await setToken(token);  
      Navigate("/signin", { replace: true });
      toast(`Email successfully created please SignIn`);
    } catch (error) {
      
      console.log(error.config);
    }
  };


  return (
    <Container style={{ marginTop: "0px" }}>
      <Row style={{ marginTop: "50px" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupFirstName">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="FirstName"
                    value={form.firstName}
                    onChange={handleChange}
                    name="firstName"
                    isInvalid={!isNameValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    FirstName must be at least 3 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGroupLastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    value={form.lastName}
                    name="lastName"
                    onChange={handleChange}
                    placeholder="LastName"
                    type="text"
                    isInvalid={!isNameValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    LastName must be at least 3 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

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
                isInvalid={!isPasswordValid}
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

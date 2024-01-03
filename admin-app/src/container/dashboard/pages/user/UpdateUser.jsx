import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BASE_URL, USER } from "../../../../components/api/Api";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${USER}/${id}`);
        setUserData(response.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/${USER}/${id}`, userData);
      toast("User updated successfully");
      Navigate("/dashboard/users", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1 className="page-title">Update User</h1>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="contactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={userData.contactNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          style={{ marginTop: "10px" }}
          variant="primary"
          onClick={handleUpdate}
        >
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;

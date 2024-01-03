import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, USER, USERS } from "../../../../components/api/Api";
import "../Pages.css";
import Swal from "sweetalert2";

const Users = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${USERS}`);
        setUser(response.data.users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = user.filter((u) =>
    u.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/${USER}/${userId}`);
        toast.success("User Deleted Successfully");

        const response = await axios.get(`${BASE_URL}/${USERS}`);
        setUser(response.data.users);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error Deleting User");
    }
  };
  return (
    <div>
      <h1 className="page-title">Welcome to Users Page</h1>
      <FormControl
        type="text"
        placeholder="Search by firstName"
        className="search-input mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <Alert variant="info" className="no-matching-alert">
          No matching users found.
        </Alert>
      ) : (
        <Table className="Table" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.firstName}</td>
                <td>@{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(u._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>{" "}
                  <Link to={`updateuser/${u._id}`}>
                    <Button variant="info">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                  </Link>
                  <Link to={`${u._id}`}>
                    <Button variant="success">
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Users;

import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL, PRODUCTS, PRODUCT } from "../../../../components/api/Api";
import { Alert, Button, Card, FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Products = () => {
  const [pro, setPro] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${PRODUCTS}`);
        setPro(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = pro.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        await axios.delete(`${BASE_URL}/${PRODUCT}/${userId}`);
        toast.success("Product Deleted Successfully");

        const response = await axios.get(`${BASE_URL}/${PRODUCTS}`);
        setPro(response.data.products);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error Deleting Product");
    }
  };
  return (
    <div>
      <h1 className="page-title">Welcome to Users Page</h1>

      <FormControl
        type="text"
        placeholder="Search by Name"
        className="search-input mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.length === 0 ? (
        <Alert variant="info" className="no-matching-alert">
          No matching Product found.
        </Alert>
      ) : (
        <Table className="Table" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>
                  <Card.Img
                    variant="top"
                    src={`${BASE_URL}/uploads/${u.avatar}`}
                    alt={u.name}
                    style={{ height: "80px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(u._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>{" "}
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

export default Products;

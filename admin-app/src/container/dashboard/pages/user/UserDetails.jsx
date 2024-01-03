import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, USER } from '../../../../components/api/Api';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../Pages.css';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="page-title">User Details</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td><strong>FirstName:</strong></td>
            <td>{userData.firstName}</td>
          </tr>
          <tr>
            <td><strong>LastName:</strong></td>
            <td>{userData.lastName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <td><strong>Role:</strong></td>
            <td>{userData.role}</td>
          </tr>
          <tr>
            <td><strong>ContactNumber:</strong></td>
            <td>{userData.contactNumber}</td>
          </tr>
          <tr>
            <td><strong>CreatedAt:</strong></td>
            <td>{userData.createdAt}</td>
          </tr>
          <tr>
            <td><strong>UpdatedAt:</strong></td>
            <td>{userData.updatedAt}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetails;

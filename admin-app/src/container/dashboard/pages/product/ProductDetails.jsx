import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, PRODUCT } from '../../../../components/api/Api';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../Pages.css';
import { Card } from 'react-bootstrap';

const ProductDetails = () => {
  const [productData, setproductData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${PRODUCT}/${id}`);
        setproductData(response.data.Product);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductData();
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="page-title">Product Details</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{productData.name}</td>
          </tr>
          <tr>
            <td><strong>Image:</strong></td>
            <td><Card.Img
            variant="top"
            src={`${BASE_URL}/uploads/${productData.avatar}`}
            alt={productData.name}
            style={{ height: "60px", objectFit: "contain" }}
          /></td>
          </tr>
          <tr>
            <td><strong>Description:</strong></td>
            <td>{productData.description}</td>
          </tr>
          <tr>
            <td><strong>Price:</strong></td>
            <td>{productData.price}</td>
          </tr>
          <tr>
            <td><strong>Offer:</strong></td>
            <td>{productData.offer}</td>
          </tr>
          <tr>
            <td><strong>CreatedAt:</strong></td>
            <td>{productData.createdAt}</td>
          </tr>
          <tr>
            <td><strong>UpdatedAt:</strong></td>
            <td>{productData.updatedAt}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductDetails
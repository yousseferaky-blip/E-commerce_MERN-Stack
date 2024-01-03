import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { ADD_PRODUCT, BASE_URL } from "../../../../components/api/Api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    offer: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cookies = new Cookies();
      const token = cookies.get("Ecommerce");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("offer", form.offer);
      formData.append("avatar", images[0]);

      const response = await axios.post(
        `${BASE_URL}/${ADD_PRODUCT}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Product added successfully:");
      navigate("/");
    } catch (error) {
      console.error("Error submitting product:", error);

      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.data.error
        );
        alert(`Server Error: ${error.response.data.error}`);
      } else {
        console.error("Error setting up the request:", error.message);
        alert(
          "An error occurred while submitting the product. Please try again later."
        );
      }
    }
  };

  return (
    <>
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            required
            placeholder="Name..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
            required
            placeholder="Description..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            required
            placeholder="Price..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="offer">
          <Form.Label>Offer</Form.Label>
          <Form.Control
            name="offer"
            value={form.offer}
            onChange={handleChange}
            type="number"
            required
            placeholder="Offer..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            required
            placeholder="Images..."
          />
        </Form.Group>
        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
};

export default AddProduct;

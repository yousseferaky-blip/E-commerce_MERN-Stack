import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, PRODUCTS, CURRENT } from "../../components/api/Api";
import CartButton from "./cart/CartButton";
import "./style.css";
import Cookies from "universal-cookie";
import { getToken } from "../../components/require/GetToken";

const Product = () => {
  const [pro, setPro] = useState([]);
  const [cartId, setCartId] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/${CURRENT}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data && response.data.user) {
            setCartId(response.data.user._id);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, []);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${PRODUCTS}`);
        if (response.data && response.data.products) {
          setPro(response.data.products);
        } else {
          console.error("Error fetching data:", response);
        }      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="CARDS">
      {pro.map((product) => (
        <div key={product._id} className="CardContainer">
          <div className="img">
            <img src={`${BASE_URL}/uploads/${product.avatar}`} alt={product.name} />
          </div>
          <div className="CardBody">
            <h4>{product.name}</h4>
            <div className="price">
              <span>{`$${product.price}`}</span>
              <del>{`$${product.offer}`}</del>
            </div>
            <CartButton productId={product._id} userId={cartId} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
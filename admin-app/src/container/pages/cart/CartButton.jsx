import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ADD_CART, BASE_URL } from "../../../components/api/Api";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CartButton = ({ productId, userId }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const cookies = new Cookies();
      const token = cookies.get("Ecommerce");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "You need to login first.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/signin");
        }
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/${ADD_CART}`, {
        userId: userId,
        productId: productId,
      });

      setIsAdded(true);
      toast.success("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart. Please try again.");
    }
  };

  return (
    <div>
      <Button
        variant={isAdded ? "success" : "primary"}
        disabled={isAdded}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default CartButton;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, GET_CART, REMOVE_CART } from "../../../components/api/Api";
import { useParams } from "react-router-dom";
import "../style.css";
import Swal from "sweetalert2";
import CheckoutForm from "../../payment/CheckoutForm";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51OTnLLGoqXNjMzFsRnjV3ugASESJSG2DMBl5Qepz1PUCvYbccUGnpSZQAvytYMpc7vhBaPCm9fPRDZbEr0EycejL00VKmvBbns');
const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const { userId } = useParams();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${GET_CART}/${userId}`);
      setCartProducts(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleDelete = async (userId, productId) => {
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لن يمكنك استرجاع المنتج بعد حذفه!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احذفه!",
        cancelButtonText: "لا، إلغاء",
      });

      if (result.isConfirmed) {
        await axios.delete(`${BASE_URL}/${REMOVE_CART}`, {
          data: { userId, productId },
        });

        fetchCart();

        Swal.fire("تم الحذف!", "تم حذف المنتج من السلة.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("تم الإلغاء", "لم يتم حذف المنتج.", "info");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      Swal.fire("خطأ", "فشل في حذف المنتج من السلة.", "error");
    }
  };

  const getTotalPrice = () => {
    const totalPrice = cartProducts.reduce((total, product) => {
      return total + product.productId.price * product.quantity;
    }, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartProducts.map((product) => (
            <div key={product._id} className="cart-item">
              <img
                src={`${BASE_URL}/uploads/${product.productId.avatar}`}
                alt={product.productId.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p>Name: {product.productId.name}</p>
                <p>
                  Price: ${product.productId.price * product.quantity} -
                  Quantity: {product.quantity}
                </p>
                <button
                  onClick={() => handleDelete(userId, product.productId._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <p className="total-price">Total Price: ${getTotalPrice()}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={getTotalPrice()} onPaymentSuccess={fetchCart} />
          </Elements>       
           </div>
      )}
    </div>
  );
};

export default CartPage;

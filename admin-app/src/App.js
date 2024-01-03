import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./container/signin/Signin";
import Signup from "./container/signup/Signup";
import Header from "./components/header/Header";
import Dashboard from "./container/dashboard/Dashboard";
import Users from "./container/dashboard/pages/user/Users";
import UserDetails from "./container/dashboard/pages/user/UserDetails";
import UpdateUser from "./container/dashboard/pages/user/UpdateUser";
import Error404 from "./components/error/Error404";
import RequireAuth from "./components/require/RequireAuth";
import Error403 from "./components/error/Error403";
import AddProduct from "./container/dashboard/pages/product/AddProduct";
import Product from "./container/pages/Product";
import Products from "./container/dashboard/pages/product/Products";
import ProductDetails from "./container/dashboard/pages/product/ProductDetails";
import Home from "./container/pages/Home";
import CartPage from "./container/pages/cart/CartPage";
import CheckoutForm from "./container/payment/CheckoutForm";
import StripeContainer from "./container/payment/StripeContainer";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<CartPage />} />
        <Route path="/checkout-form" element={<CheckoutForm />} />
          <Route path="/stripe-container" element={<StripeContainer />} />
        {/* Dashboard */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Users */}
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="users/updateuser/:id" element={<UpdateUser />} />
             {/* Product */}
             <Route index element={<Products />} />
             <Route path="addproduct" element={<AddProduct />} />
             <Route path=":id" element={<ProductDetails />} />
          </Route>
        </Route>
        <Route path="/error403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;

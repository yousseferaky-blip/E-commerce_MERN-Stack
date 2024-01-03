import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL, USERS, CURRENT_USER, CURRENT } from "../api/Api";

const RequireAuth = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const token = cookies.get("Ecommerce");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${CURRENT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const currentUser = response.data.user;

        if (currentUser.role === "admin") {
          setUser(currentUser);
        } else {
          setUser(null);
          Navigate("/error403");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        Navigate("/login");
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return token ? (
    user ? (
      <Outlet />
    ) : (
      <Navigate to={"/error403"} replace={true} />
    )
  ) : (
    <Navigate to={"/"} replace={true} />
  );
};

export default RequireAuth;

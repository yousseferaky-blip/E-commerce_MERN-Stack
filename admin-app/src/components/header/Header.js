import React, { useState, useEffect } from "react";
import {  Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { BASE_URL, CURRENT , GET_CART } from "../api/Api";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faShoppingBasket,faSignIn,faXmark} from "@fortawesome/free-solid-svg-icons";
import { getToken, removeToken } from "../require/GetToken";

const Header = () => {
  const [Mobil, setMobil] = useState(false);
  const cookies = new Cookies();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken()
        if (token) {
          const response = await axios.get(`${BASE_URL}/${CURRENT}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setLoggedIn(true);
          setUsername(response.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cookies]);

  const handleLogout = () => {
    removeToken()
    setLoggedIn(false);
    setUsername("");
    navigate("/", { replace: true });
  };



  return (
    <nav>
      <p className="shop">Welcome to our shop! </p>
      <ul className={Mobil ? "Nav-Link" : "Nav-Mobil"}>
        <li>
          <Link to="/" className="Link">
            {username.role === "admin" && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Link>
        </li>

        <li>
          <Link className="Link" to="/">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
  <li>
    <NavDropdown
      className="Link"
      title={`${username.firstName}`}
      id="navbarScrollingDropdown"
    >
      <NavDropdown.Item>
        <>
          <Nav.Link as={Link} onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      </NavDropdown.Item>
    </NavDropdown>
  </li>
) : (
  <>
    <li>
      <Link className="Link" to="/signin">
        <FontAwesomeIcon icon={faSignIn} />
        Signin
      </Link>
    </li>
  </>
)}
        <li>
          <Link className="Link" to={`${username._id}`}>
            <FontAwesomeIcon icon={faShoppingBasket} />
          </Link>
        </li>
      </ul>
      <a className="icon" onClick={() => setMobil(!Mobil)}>
        {Mobil ? (
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </a>
    </nav>
  );
};

export default Header;

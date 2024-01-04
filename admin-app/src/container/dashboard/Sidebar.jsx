import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faTimes , faBox } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`Side ${isOpen ? "open" : "close"}`}>
      <FontAwesomeIcon onClick={handleClick} icon={faTimes} className={"open-btn"} />
      <div className="ContentSide">
        <NavLink to={"/dashboard/users"} className="NavLink">
          <FontAwesomeIcon icon={faUser} />
          <p>Users</p>
        </NavLink>

        <NavLink to={"/dashboard"} className="NavLink">
          <FontAwesomeIcon icon={faBox} />
          <p>Products</p>
        </NavLink>

        <NavLink to={"/dashboard/addproduct"} className="NavLink">
          <FontAwesomeIcon icon={faPlus} />
          <p>Add Product</p>
        </NavLink>

        
      </div>
    </div>
  );
};

export default Sidebar;

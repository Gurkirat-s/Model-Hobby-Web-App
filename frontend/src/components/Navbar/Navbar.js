import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

// import logo from "../../assets/images/logo-color2.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to={'/'} className="left">
          <img className="logo" src="/images/logo-color2.png" alt="Logo" />
        </Link>

        <div className="right">
          <Link to="cart" className="icon-container">
            <AiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

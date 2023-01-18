import React from 'react';
import './Cart.scss';
import CartGrid from '../../components/CartGrid/CartGrid';
import Shipping from '../Shipping/Shipping';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="cart">
      <CartGrid />
      <Link to="/shipping" className="checkout">
        <button>Check Out</button>
      </Link>
    </div>
  );
};

export default Cart;

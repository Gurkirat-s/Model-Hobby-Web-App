import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="top">
          <div className="col">
            <h1>Categories</h1>
            <Link className="link" to={'category/1'}>
              Motorcycles
            </Link>
            <Link className="link" to={'category/2'}>
              Classic Cars
            </Link>
            <Link className="link" to={'category/3'}>
              Trucks & Buses
            </Link>
            <Link className="link" to={'category/4'}>
              Vintage Cars
            </Link>
            <Link className="link" to={'category/5'}>
              Planes
            </Link>
            <Link className="link" to={'category/6'}>
              Ships
            </Link>
            <Link className="link" to={'category/7'}>
              Trains
            </Link>
          </div>
          <div className="col">
            <h1>Shipping & Site Policies</h1>
            <span>Shipping Policy</span>
            <span>FAQ</span>
            <span>Loyalty Program Info</span>
            <span>About us</span>
            <span>Returns</span>
            <span>Privacy Policy</span>
          </div>
          <div className="col">
            <h1>Contact us</h1>
            <div className="address">
              <span>123 Some Street</span>
              <span>Toronto, ON</span>
              <span>A1B 2C3</span>
              <span>(905) 123-4567</span>
            </div>
            <div className="times">
              <span>Monday-Thursday 11am - 5pm</span>
              <span>Friday 11am - 7pm</span>
              <span>Saturday 10am - 8pm</span>
              <span>Sunday 12pm - 5pm</span>
            </div>
          </div>
          <div className="col">
            <h1>About</h1>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              consectetur odio turpis, ac scelerisque elit imperdiet id. Nam
              arcu leo, scelerisque eget lacinia vitae, lacinia vel odio.
              Curabitur sagittis cursus sollicitudin. Sed et sapien sed sapien
              scelerisque semper maximus cursus odio. Praesent vel est
              venenatis, sollicitudin mauris non, aliquam arcu. Aenean id sapien
              augue.
            </span>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <img src="/images/logo-black2.png" alt="logo" />
            <span className="copyright">
              © Copyright 2022. All Rights Reserved
            </span>
          </div>
          <div className="right">
            <img src="/images/payment.png" alt="Payment options" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import './Finish.scss';
import React, { useEffect } from 'react';
import ShippingAddress from '../../utils/services/ShippingAddress';
import { useNavigate } from 'react-router-dom';

const Finish = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!ShippingAddress.hasAddress()) {
      navigate('/');
    }
  }, []);
  const address = ShippingAddress.get();
  console.log('Finish');
  console.log(address);
  return (
    <div className="finish">
      <h2>Thank you for shopping at Model Hobby.</h2>
      <div className="address">
        <div>{address.name}</div>
        <div>{address.email}</div>
        <div>{address.streetAddress}</div>
        <div>
          <div>
            {address.city}, {address.province}
          </div>
          <div>{address.code}</div>
        </div>
        <div>{address.delivery}</div>
      </div>
    </div>
  );
};

export default Finish;

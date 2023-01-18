import React from 'react';
import './Shipping.scss';
import { useForm } from 'react-hook-form';
import {
  CanadianProvincesAndTerritories,
  USStatesAndTerritories,
  DeliveryMethods,
} from '../../utils/models/shippingConstants';
import { Link, useNavigate } from 'react-router-dom';
import ShippingAddress from '../../utils/services/ShippingAddress';

const Shipping = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleFormSubmit = (data, e) => {
    console.log('submitted');
    console.log(data, e);
    ShippingAddress.save(data);
    console.log(errors);
    navigate('/finish');
  };

  return (
    <div className="shipping">
      <div className="title">
        <h2>Shipping Information</h2>
      </div>
      <form className="shipping-form" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="row">
          <div className="input-wrap">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
              name="name"
            />
          </div>
          <p>{errors.name && errors.name.message}</p>
        </div>

        <div className="row">
          <div className="input-wrap">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              type="text"
              name="email"
            />
          </div>
          <p>{errors.email && errors.email.message}</p>
        </div>

        <div className="row">
          <div className="input-wrap">
            <label htmlFor="streetAddress">Address</label>
            <input
              placeholder="Street Address"
              {...register('streetAddress', {
                required: 'Please enter an address',
              })}
              type="text"
              name="streetAddress"
            ></input>
          </div>
          <p>{errors.streetAddress && errors.streetAddress.message}</p>
        </div>

        <div className="row">
          <div className="input-wrap">
            <label htmlFor="city">City</label>
            <input
              placeholder="City"
              {...register('city', { required: 'Please enter a city' })}
              type="text"
              name="city"
            ></input>
          </div>
          <p>{errors.city && errors.city.message}</p>
        </div>

        <div className="row">
          <div className="input-wrap">
            <label htmlFor="province">Province/State</label>
            <select
              {...register('province', { required: 'Province is required.' })}
              name="province"
            >
              <option hidden>Province/State</option>
              <optgroup label="Canada">
                {CanadianProvincesAndTerritories.map((province) => {
                  return (
                    <option value={province.code} key={province.code}>
                      {province.code} - {province.name}
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label="United States">
                {USStatesAndTerritories.map((state) => {
                  return (
                    <option value={state.code} key={state.code}>
                      {state.code} - {state.name}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-wrap">
            <label htmlFor="code">Postal/Zip Code</label>
            <input
              placeholder="Postal/Zip Code"
              {...register('code', {
                required: 'Postal Code is required',
                pattern: {
                  value:
                    /^([A-Za-z][0-9][A-Za-z][" "]?[0-9][A-Za-z][0-9]|[0-9]{5})$/,
                  message: 'Please enter a valid Postal/Zip Code.',
                },
              })}
              type="text"
              name="code"
            ></input>
          </div>
          <p>{errors.code && errors.code.message}</p>
        </div>

        <div className="row">
          <div className="input-wrap">
            <label htmlFor="delivery">Delivery Methods</label>
            <select
              {...register('delivery', {
                required: 'Delivery method is required.',
              })}
              name="delivery"
            >
              <option hidden>Delivery Method</option>
              <optgroup>
                {DeliveryMethods.map((method, index) => {
                  return <option key={index}>{method}</option>;
                })}
              </optgroup>
            </select>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Shipping;

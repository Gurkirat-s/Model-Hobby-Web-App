import React, { useEffect, useState } from "react";
import "./Sidebar.scss";

const Sidebar = ({ updateProducts }) => {
  const [vendors, setVendors] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(250);

  useEffect(() => {
    fetch("http://localhost:4000/api/vendors")
      .then((response) => response.json())
      .then((data) => {
        setVendors(data);
        return data;
      })
      .then((data) => setCheckboxes(new Array(data.length).fill(false)));
  }, []);

  // try using this to send new data if needed.
  // useEffect(() => {

  // }, [checkboxes]);

  const handleChange = (event) => {
    const index = event.target.value - 1;
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !checkboxes[index];
    setCheckboxes(updatedCheckboxes);
    updateProducts(updatedCheckboxes, maxPrice);
  };

  const handleSliderChange = (event) => {
    setMaxPrice(event.target.value);
    // console.log(setMaxPrice);
  };

  const handleSliderInput = () => {
    console.log("slider inputed");
    updateProducts(checkboxes, maxPrice);
  };

  return (
    <div className="sidebar">
      <div className="vendor-checkboxes">
        <h3>Filter by brands</h3>
        <div>
          {vendors.map((vendor, index) => {
            return (
              <div className="input-checkbox" key={index}>
                <input
                  type="checkbox"
                  id={vendor.id}
                  value={vendor.id}
                  defaultChecked={checkboxes[index]}
                  onChange={handleChange}
                />
                <label htmlFor={vendor.id}>{vendor.name}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="slider-container">
        <h3>Filter by price</h3>
        <div className="slider">
          <span>0</span>
          <input
            type="range"
            min={0}
            max={250}
            value={maxPrice}
            onChange={handleSliderChange}
            onMouseUp={handleSliderInput}
          />
          <span>{maxPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

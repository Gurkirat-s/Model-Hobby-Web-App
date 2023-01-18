import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

const ProductCard = ({ product, imgUrl }) => {
  const url = 'http://localhost:4000/api/cart/update';
  // const imgUrl = "https://picsum.photos/500";
  // const product = {
  //   id: "S10_1949",
  //   name: "1952 Alpine Renault 1300",
  //   description:
  //     "Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.",
  //   qty: 7305,
  //   cost: 98.58,
  //   msrp: 214.3,
  //   catId: 2,
  //   venId: 2,
  //   category: "Classic Cars",
  //   vendor: "Classic Metal Creations",
  // };

  const f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const price = f.format(product.msrp);

  const handleClick = (e) => {
    e.preventDefault();

    const id = product.id;
    const qty = 1;
    console.log('added to cart');
    // fetch(url, {
    //   method: 'POST',
    //   // credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     id,
    //     qty,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    axios
      .post(
        url,
        {
          id,
          qty,
        },
        { withCredentials: true }
      )
      .then((response) => console.log(response.data));

    alert('Added to cart');
  };

  return (
    <div className="product-card">
      <img src={imgUrl} />
      <div className="product-info">
        <div className="title">{product.name}</div>
        <div className="vendor">{product.vendor}</div>
        <div className="price">{price}</div>
        <button onClick={handleClick}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

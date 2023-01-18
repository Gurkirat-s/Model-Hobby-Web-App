import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.scss';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();
  const getUrl = 'http://localhost:4000/api/products/';
  const postUrl = 'http://localhost:4000/api/cart/update';

  useEffect(() => {
    fetch(getUrl + id)
      .then((response) => response.json())
      .then((data) => setProduct(data));

    fetch('https://picsum.photos/v2/list?page=2&limit=2')
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const id = product.id;
    const qty = quantity;
    axios
      .post(
        postUrl,
        {
          id,
          qty,
        },
        { withCredentials: true }
      )
      .then((response) => console.log(response.data));
  };

  return (
    <div className="product-page">
      <div className="left">
        <div className="images">
          <img
            src={images[0]?.download_url}
            alt="Product image"
            onClick={(e) => setSelectedImage(0)}
          />
          <img
            src={images[1]?.download_url}
            alt="Product image"
            onClick={(e) => setSelectedImage(1)}
          />
        </div>
        <div className="main-image">
          <img src={images[selectedImage]?.download_url} alt="Product image" />
        </div>
      </div>

      <div className="right">
        <h1>{product.name}</h1>
        <h2>{product.vendor}</h2>
        <span className="price">${product.msrp}</span>
        <p>{product.description}</p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 0 ? 0 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button onClick={handleClick} className="add">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

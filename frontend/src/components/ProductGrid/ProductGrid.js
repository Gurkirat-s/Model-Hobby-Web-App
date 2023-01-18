import React from 'react';
import './ProductGrid.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';

export const ProductGrid = ({ products, images }) => {
  // console.log(products);
  // console.log(images);

  return (
    <div className="product-grid">
      {products && products.length > 0 ? (
        products.map((product, index) => {
          return (
            <Link
              className="link"
              key={product.id}
              to={`/product/${product.id}`}
            >
              <ProductCard
                product={product}
                imgUrl={images[index]?.download_url}
              />
            </Link>
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
};

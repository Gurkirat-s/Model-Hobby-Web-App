import React from "react";
import "./CategoryCard.scss";

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <img src={`/images/categories/${category?.id}.jpg`} />
      <div className="overlay">
        <h3>{category?.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;

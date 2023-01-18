import React, { useEffect, useState } from "react";
import "./Categories.scss";
import CategoryCard from "../CategoryCard/CategoryCard";
import { Link } from "react-router-dom";

const Categories = () => {
  const [catalog, setCatalog] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/api/catalog")
      .then((result) => result.json())
      .then((data) => setCatalog(data));
  }, []);

  return (
    <div className="categories">
      <h2>Top Categories</h2>
      <div className="card-container">
        {catalog?.map((category) => {
          return (
            <Link key={category.id} to={`category/${category.id}`}>
              <CategoryCard category={category} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

import React, { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import "./CategoryPage.scss";
import "../../components/CategoryCard/CategoryCard";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import Sidebar from "../../components/Sidebar/Sidebar";

let initProducts = [];

// const filterVendors = (products, filter) => {
//   const result = [];

//   let count = 0;
//   for (let i = 0; i < filter.length; i++) {
//     products.forEach((product) => {
//       if (filter[i]) {
//         if (product.venId - 1 === i) {
//           count++;
//           console.log("triggered");
//           result.push(product);
//         }
//       }
//     });
//   }
//   if (count == 0) {
//     setProducts(initProducts);
//   } else {
//     setProducts(newProducts);
//   }
// };

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/api/products/category/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        initProducts = data;
        // console.log(initProducts);
        return fetch(
          "https://picsum.photos/v2/list?page=1&limit=" + data.length
        );
      })
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((err) => console.log("Request Failed", err));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/products/category/" + id)
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  // const filterVendors = (products, filter) => {
  //   const result = [];

  //   let count = 0;
  //   for (let i = 0; i < filter.length; i++) {
  //     products.forEach((product) => {
  //       if (filter[i]) {
  //         if (product.venId - 1 === i) {
  //           count++;
  //           console.log("triggered");
  //           result.push(product);
  //         }
  //       }
  //     });
  //   }
  //   if (count == 0) {
  //     setProducts(initProducts);
  //   } else {
  //     setProducts(result);
  //   }
  // };

  const filterVendor = (initProducts, vendorFilter) => {
    const result = [];
    const allProducts = [...initProducts];
    let count = 0;
    for (let i = 0; i < vendorFilter.length; i++) {
      allProducts.forEach((product) => {
        if (vendorFilter[i]) {
          if (product.venId - 1 === i) {
            count++;
            result.push(product);
          }
        }
      });
    }
    if (count === 0) {
      return allProducts;
    } else {
      return result;
    }
  };

  const filterPrice = (initProducts, maxPrice) => {
    const allProducts = initProducts;
    const result = [];

    allProducts.forEach((product) => {
      if (product.msrp <= maxPrice) {
        result.push(product);
      }
    });
    return result;
  };

  const updateProducts = (vendorFilter, maxPrice) => {
    // console.log(vendorFilter);
    // const newProducts = [];
    // const allProducts = initProducts;
    // // console.log(initProducts);
    // let count = 0;
    // for (let i = 0; i < vendorFilter.length; i++) {
    //   allProducts.forEach((product) => {
    //     if (vendorFilter[i]) {
    //       if (product.venId - 1 === i) {
    //         count++;
    //         console.log("triggered");
    //         newProducts.push(product);
    //       }
    //     }
    //   });
    // }
    // // console.log(newProducts);
    // if (count == 0) {
    //   setProducts(initProducts);
    // } else {
    //   setProducts(newProducts);
    // }
    // // console.log(newProducts);

    const vendorFiltered = filterVendor(initProducts, vendorFilter);
    const filtered = filterPrice(vendorFiltered, maxPrice);
    setProducts(filtered);
    console.log(filtered);
  };

  return (
    <div className="category-page">
      <Sidebar updateProducts={updateProducts} />
      <div>
        <h2>{products[0]?.category}</h2>
        <ProductGrid products={products} images={images} />
      </div>
    </div>
  );
};

export default CategoryPage;

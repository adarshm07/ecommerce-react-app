import React from "react";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";

const ProductListing = ({ products }) => {
  return (
    <div>
      <div>
        <ProductFilter />
      </div>
      <div className="product-list">
        {products &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              id={product._id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductListing;

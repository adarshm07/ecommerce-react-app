import React from "react";
import ProductCard from "./ProductCard";

const ProductListing = ({ products }) => {
  return (
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
  );
};

export default ProductListing;

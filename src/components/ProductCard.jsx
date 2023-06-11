import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const ProductCard = ({ id, title, price, description }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      const product = JSON.stringify({ productId: id });

      let config = {
        method: "post",
        url: "http://localhost:8080/api/v1/cart",
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
        data: product,
      };

      axios.request(config).then((response) => {
        if (response.data.statusCode === 201) {
          dispatch(addToCart({ id, title, price }));
          toast.success("Product added to cart");
        } else {
          toast.error("Something went wrong");
        }
      });
      // console.log(data);
    } catch (error) {}
  };
  return (
    <div className="product">
      <div className="product-img">
        <img src="https://via.placeholder.com/300x250" alt="" />
      </div>
      <Link to={`/product/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p>Price: {price}</p>
      <p>{description}</p>
      <button className="btn btn-sm btn-primary" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

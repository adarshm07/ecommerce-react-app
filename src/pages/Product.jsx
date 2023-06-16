import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function Product() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log(id);

  const getProduct = async () => {
    const data = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
    console.log(data);
    if (data.data.statusCode === 200) {
      setProduct(data.data.data);
    } else {
      toast.error("Error.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center bg-primary text-white"
        style={{ height: "200px" }}
      >
        <h1 className="text-center">{product.title}</h1>
      </div>
      <div>
        <h1 className="text-center">Description: {product.description}</h1>
        <h1 className="text-center">Price: {product.price}</h1>
      </div>
    </Layout>
  );
}

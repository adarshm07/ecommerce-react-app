import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import ProductDetail from "../components/ProductDetail";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Product() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log(id);

  const getProduct = async () => {
    const data = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
    // console.log(data);
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
      <Breadcrumbs title={product.title} />
      <ProductDetail
        title={product.title}
        price={product.price}
        description={product.description}
      />
    </Layout>
  );
}

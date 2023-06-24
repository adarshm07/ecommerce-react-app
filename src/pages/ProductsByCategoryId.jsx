import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductListing from "../components/ProductListing";
import Layout from "../components/Layout";

export default function ProductsByCategoryId({ products }) {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProductsByCategoryId = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/v1/product/by/category/${category}`
    );
    // console.log(data);

    if (data?.data?.statusCode === 200) {
      setAllProducts(data?.data?.data);
    } else {
      toast.error("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchAllProductsByCategoryId();
  }, []);
  return (
    <Layout>
      <ProductListing products={allProducts} />
    </Layout>
  );
}

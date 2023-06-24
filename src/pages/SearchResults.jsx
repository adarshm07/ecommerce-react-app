import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";

export default function SearchResults() {
  const router = useParams();

  const [products, setProducts] = useState();

  const getProducts = async () => {
    try {
      const data = JSON.stringify({
        search: router.search,
        categoryId: router.id === "all" ? "" : router.id,
      });
      const config = {
        method: "post",
        url: "http://localhost:8080/api/v1/product/search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      {/* search results */}
      <h2>Search Results</h2>
      <div>
        {products && products.length === 0 && <p>No results found</p>}
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
    </Layout>
  );
}

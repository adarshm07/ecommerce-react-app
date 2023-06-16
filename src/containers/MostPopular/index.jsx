import { useEffect, useState } from "react";
import axios from "axios";
import ProductByCategory from "../../components/ProductByCategory";

export default function MostPopular() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    const data = await axios.get("http://localhost:8080/api/v1/product");
    setAllProducts(data.data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="product__by__category">
      <ProductByCategory title={"Most Popular"} allProducts={allProducts} />
    </div>
  );
}

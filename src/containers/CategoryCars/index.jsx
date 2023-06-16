import { useEffect, useState } from "react";
import axios from "axios";
import ProductByCategory from "../../components/ProductByCategory";

export default function CategoryCars() {
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    const data = await axios.get(
      "http://localhost:8080/api/v1/product/by/category/6483f360620dd774e1d69a2b"
    );
    console.log(data.data.data);
    setAllProducts(data.data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="product__by__category">
      <ProductByCategory
        title={"Most Popular Cars"}
        allProducts={allProducts}
      />
    </div>
  );
}

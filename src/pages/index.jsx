import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [allCategories, setAllCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const data = await axios.get("http://localhost:8080/api/v1/category");
      console.log(data);
      if (data?.data?.statusCode === 200) {
        setAllCategories(data?.data?.data);
      } else {
        toast.error("Error.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <Layout>
      <div className="d-flex gap-4 my-4 flex-wrap">
        {allCategories &&
          allCategories.map((category) => {
            // const updatedLink = category.title
            //   ?.toLowerCase()
            //   ?.replaceAll(/[^\w\s]/gi, "")
            //   ?.split(" ")
            //   ?.join("-");
            return (
              <Link to={`/category/${category._id}`}>
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  image={category.image}
                />
              </Link>
            );
          })}
      </div>
    </Layout>
  );
}

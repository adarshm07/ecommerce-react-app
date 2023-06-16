import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { toast } from "react-toastify";
import axios from "axios";

export default function SearchBar() {
  const [allCategories, setAllCategories] = useState([]);
  //   const [categoryId, setCategoryId] = useState("");

  const fetchAllCategories = async () => {
    const data = await axios.get("http://localhost:8080/api/v1/category");
    if (data.data.statusCode === 200) {
      setAllCategories(data.data.data);
    } else {
      toast.error("Error.");
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return <Search allCategories={allCategories} />;
}

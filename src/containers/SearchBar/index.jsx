import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const router = useLocation();
  // console.log(router);
  const [allCategories, setAllCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState("all");

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

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const getProducts = () => {
    if (router.pathname === "/") {
      navigate(`/search/${categoryId}/${searchText}`);
    } else {
      window.open(
        `http://localhost:3000/search/${categoryId}/${searchText}`,
        "_self"
      );
    }
  };

  const onCategoryChange = (e) => {
    setCategoryId(e);
  };

  return (
    <Search
      allCategories={allCategories}
      searchText={searchText}
      onSearchTextChange={handleSearchTextChange}
      onProductSearch={getProducts}
      categoryId={categoryId}
      onCategoryChange={onCategoryChange}
    />
  );
}

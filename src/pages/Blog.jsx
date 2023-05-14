import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { allPosts } from "../store/postsSlice";
import Layout from "../components/Layout";
import { add } from "../store/categorySlice";

export default function Blog() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  // const posts = useSelector((state) => state.posts.allPosts);
  // const allCategories = useSelector((state) => state.categories.categories);

  const [blogPosts, setBlogPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // The 'fetchAllBlog' function is triggered, fetching all the blog posts using the URL specified in axios.get.
  const fetchBlog = async (page, limit) => {
    let url = "";
    console.log("selectedCategory", selectedCategory);
    if (selectedCategory === "all") {
      url = `http://localhost:4000/api/v1/blog/getAll?page=${page}&limit=${limit}`;
    } else {
      url = `http://localhost:4000/api/v1/blog/get/category/${selectedCategory}?page=${page}&limit=${limit}`;
    }

    const data = await axios.get(url);
    const response = await data.data.data;
    dispatch(allPosts(response));

    // reverse the array to display the latest post first
    const reversed = [...response].reverse();
    setBlogPosts(reversed);
  };

  const fetchAllCategory = async () => {
    const data = await axios.get(
      `http://localhost:4000/api/v1/category/getAll`
    );
    const response = await data.data.data;
    setCategories(response);
    dispatch(add(response));
  };

  useEffect(() => {
    fetchBlog(page, limit);
    fetchAllCategory();
  }, [selectedCategory, page]);

  // The 'deletePostById' function calls the API with the specified ID to delete a blog post. If the request is successful,
  // a toast message is displayed, and the 'fetchAllBlog' function is called to update the list of blog posts.
  const deletePostById = async (id, page, limit) => {
    const data = await axios.delete(
      `http://localhost:4000/api/v1/blog/delete/${id}`
    );
    if (data.data.statusCode === 201) toast("Post Deleted Successfully");
    fetchBlog(page, limit);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Layout>
      <div
        className="d-flex flex-column justify-content-center align-items-center bg-primary text-white"
        style={{ height: "200px" }}
      >
        <h1 className="text-center">Blog</h1>
        <div className="d-flex gap-2">
          <select className="form-select" onChange={handleCategoryChange}>
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* blog posts */}
      {blogPosts &&
        blogPosts.map((item) => {
          return (
            <div key={item._id} className="card my-4">
              <div className="card-body">
                {item.category && (
                  <span className="badge bg-primary text-white my-2">
                    {item.category.title}
                  </span>
                )}
                <h5 className="card-title">{item.title}</h5>

                <div className="d-flex justify-content-between">
                  {/* show edit and delete btn only if user is logged in. */}
                  {isLoggedIn && (
                    <div className="d-flex gap-1 mt-4">
                      <Link
                        className="btn btn-sm btn-primary px-4"
                        to={`/edit-blog/${item._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-warning px-4"
                        onClick={() => deletePostById(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <Link to={`/blog/${item._id}`}>Read more</Link>
                </div>
              </div>
            </div>
          );
        })}

      {/* pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-5">
          <li className={`page-item ${page === 1 && "disabled"}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
          <li className={`page-item ${blogPosts.length < 5 && "disabled"}`}>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Layout>
  );
}

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TextEditor from "../components/TextEditor";
import { add } from "../store/categorySlice";

function AddBlog() {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    (async () => {
      const data = await axios.get(
        `http://localhost:4000/api/v1/category/getAll`
      );
      const response = await data.data.data;
      dispatch(add(response));
      // this will make sure that, even if no category is selected, the first category will be selected by default
      setSelectedCategory(response[0]._id);
    })();
  }, []);

  // The form has an onSubmit event listener that triggers the handleSubmit function when the user submits the form. On successful completion of the POST request
  //  and addition of the new blog post, the user is redirected to the home page of the blog using the useNavigate hook.
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/v1/blog/add`, {
        title: title,
        description: content,
        url: `${window && window.location.origin}/${slug}`,
        category: selectedCategory,
      })
      .then((response) => {
        // console.log(response);
        navigate("/");
      });
  }

  // update the slug using title only if slug is empty.
  const updateSlug = (e) => {
    if (title !== "" && slug === "") {
      const updatedSlug = e.target.value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      setSlug(updatedSlug);
    }
  };

  // this will update the slug to a format suitable to be used for url.
  const handleSlug = (e) => {
    const updatedSlug = e.target.value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
    setSlug(updatedSlug);
  };

  return (
    <Layout>
      <h2 className="fs-4 mt-3">Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={updateSlug}
            placeholder="Title"
          />
        </div>

        <div className="d-flex align-items-center">
          {/* show current site origin and then add an input field to type */}
          <span className="me-2">{window && window.location.origin}/</span>
          <input
            type="text"
            className="form-control"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onBlur={handleSlug}
            placeholder="Slug"
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <TextEditor value={content} setValue={setContent} />
        </div>

        <select
          className="form-check my-4"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
        </select>

        <button className="btn btn-sm btn-primary mt-4" type="submit">
          Publish
        </button>
      </form>
    </Layout>
  );
}

export default AddBlog;

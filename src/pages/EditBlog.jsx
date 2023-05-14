import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/categorySlice";

const EditBlog = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [slug, setSlug] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/blog/get/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setContent(response.data.data.description);
        setSelectedCategory(response.data.data.category._id);
        setSlug(response.data.data.url.split("/")[3]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      title: title,
      description: content,
      url: `${window && window.location.origin}/${slug}`,
      category: selectedCategory,
    };
    axios
      .put(`http://localhost:4000/api/v1/blog/update/${id}`, blog)
      .then(() => {
        navigate("/");
      });
  };

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
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <TextEditor value={content} setValue={setContent} />
        <button className="btn btn-primary mt-3" type="submit">
          Update
        </button>
      </form>
    </Layout>
  );
};

export default EditBlog;

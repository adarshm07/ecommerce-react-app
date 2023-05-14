import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function SinglePost() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/blog/get/${id}`)
      .then((response) => {
        setBlog(response.data.data);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center bg-primary text-white"
        style={{ height: "200px" }}
      >
        <h1 className="text-center">{blog.title}</h1>
      </div>
      <div className="my-4">
        <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
      </div>
    </Layout>
  );
}

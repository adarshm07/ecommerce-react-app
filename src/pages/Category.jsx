import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { add } from "../store/categorySlice";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  // fetch api whenever a new category is added, updated or deleted, we need to let the useEffect know that it is updated.
  // as a workaround, we are using this. You can also use the redux store to do this, then you don't have to pass props to childs like we are doing in this example.
  const [observer, setObserver] = useState(false);

  const fetchAllCategory = async () => {
    const data = await axios.get(
      `http://localhost:4000/api/v1/category/getAll`
    );
    const response = await data.data.data;
    setCategories(response);
    dispatch(add(response));
    setObserver(false);
  };

  useEffect(() => {
    fetchAllCategory();
  }, [observer]);
  return (
    <Layout>
      <div className="row">
        <div className="container d-flex justify-content-between">
          <div className="col-12 col-md-4">
            <AddCategory setObserver={setObserver} />
          </div>
          <div className="col-12 col-md-6">
            <CategoryMap categories={categories} setObserver={setObserver} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// add category
const AddCategory = ({ setObserver }) => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if title is empty.
    if (category.title === "") {
      toast.error("Please enter a title");
      return;
    }

    // check if description is empty.
    if (category.description === "") {
      toast.error("Please enter a description");
      return;
    }

    const data = await axios.post(`http://localhost:4000/api/v1/category/add`, {
      title: category.title,
      description: category.description,
    });

    const response = await data.data;
    setObserver(true);

    if (response.statusCode === 201) {
      toast.success("Category Added Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="container">
          <div className="col-12">
            <form className="d-flex flex-column gap-3 my-4">
              <input
                type="text"
                placeholder="Enter Category"
                className="form-control"
                onChange={(e) =>
                  setCategory({ ...category, title: e.target.value })
                }
              />
              <textarea
                className="form-control"
                placeholder="Enter Description"
                onChange={(e) =>
                  setCategory({ ...category, description: e.target.value })
                }
              ></textarea>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// category map
const CategoryMap = ({ categories, setObserver }) => {
  const deleteCategoryById = async (id) => {
    const data = await axios.delete(
      `http://localhost:4000/api/v1/category/delete/${id}`
    );
    const response = await data.data;
    setObserver(true);

    if (response.statusCode === 201) {
      toast.success("Category Deleted Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <React.Fragment>
      <div className="my-4">
        <h4>Categories</h4>
        <hr />
        {categories.map((category) => (
          <div key={category._id} className="d-flex gap-3 my-4">
            <h5>{category.title}</h5>
            <p>{category.description}</p>
            <div className="ms-auto">
              <button
                className="btn btn-warning"
                onClick={() => deleteCategoryById(category._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

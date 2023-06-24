import { useState } from "react";
import axios from "axios";
import CustomTable from "../../components/CustomTable";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardLayout from "../../components/DashboardLayout";
import Modal from "../../components/Modal";
import { ImageUpload } from "../../components/ImageUpload";

export default function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [current, setCurrent] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    categoryId: "",
  });
  const token = useSelector((state) => state.user.token);

  const getAllProducts = async () => {
    const data = await axios.get("http://localhost:8080/api/v1/product", {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    });

    if (data?.data?.data) {
      setAllProducts(data.data.data);
    } else {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:8080/api/v1/product/${id}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      if (data.data.statusCode === 201) {
        toast.success("Product deleted successfully.");
        getAllProducts();
      } else {
        toast.error("Error.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpload = async (file) => {
    var formdata = new FormData();
    formdata.append("image", file[0], file[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/upload`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        // console.log(data);
        if (data.status) {
          setImageUrl(data?.data?.path);
        } else {
          toast.error("Error.");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = () => {
    let data = JSON.stringify({
      title,
      description,
      price,
      categoryId,
      image: imageUrl,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/product`,
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.statusCode === 201) {
          toast.success("Product added successfully.");
        } else {
          toast.error("Error.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columnHelper = createColumnHelper();

  let columns = [
    columnHelper.accessor("title", {
      header: () => <span>Title</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("price", {
      header: () => "Mobile",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("categoryId.title", {
      header: () => "Category",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("action", {
      header: () => "Action",
      cell: (info) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              setCurrent({
                title: info.row.original.title,
                description: info.row.original.description,
                imageUrl: info.row.original.image,
              });
              setIsOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => handleDeleteProduct(info.row.original._id)}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  useEffect(() => {
    console.log(current);
  }, [current]);

  return (
    <DashboardLayout>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-75 m-auto border border-1 rounded p-4 mt-4">
          <h1 className="fs-4">Add Product</h1>
          <input
            type="text"
            className="form-control mt-4"
            placeholder="Title"
            value={current.title}
            onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Description"
            value={current.description}
            onChange={(e) =>
              setCurrent({ ...current, description: e.target.value })
            }
          />

          <input
            type="number"
            className="form-control mt-3"
            placeholder="Price"
            value={current.price}
            onChange={(e) => setCurrent({ ...current, price: e.target.value })}
          />

          <select
            name="category"
            id="category"
            className="form-control mt-3"
            value={current.categoryId}
            onChange={(e) =>
              setCurrent({ ...current, categoryId: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {allCategories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.title}
              </option>
            ))}
          </select>

          <ImageUpload
            onDrop={onUpload}
            reject="Image/Video file less than 5mb"
            uploadImg="Upload Image/Videos"
            description="Drag'n'drop files here to upload. We can accept only img or video files that are less than 5mb in size."
          />
          {current.imageUrl && (
            <img
              src={current.imageUrl}
              alt="product"
              style={{ maxHeight: "100px" }}
            />
          )}
          <button className="w-100 btn btn-primary mt-4" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </Modal>
      <CustomTable data={allProducts} columns={columns} />
    </DashboardLayout>
  );
}

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

export default function AllCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [current, setCurrent] = useState({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    price: 0,
    categoryId: "",
  });
  const token = useSelector((state) => state.user.token);

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

  const handleDeleteCategory = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:8080/api/v1/category/${id}`,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      if (data.data.statusCode === 201) {
        toast.success("Product deleted successfully.");
        fetchAllCategories();
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
          setCurrent({ ...current, imageUrl: data?.data?.path });
        } else {
          toast.error("Error.");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = () => {
    let data = JSON.stringify({
      title: current.title,
      description: current.description,
      price: current.price,
      categoryId: current.categoryId,
      image: current.imageUrl,
    });

    let config = {
      method: "put",
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/category/${current.id}`,
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
                id: info.row.original._id,
                title: info.row.original.title,
                description: info.row.original.description,
                imageUrl: info.row.original.imageUrl,
              });
              setIsOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => handleDeleteCategory(info.row.original.id)}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  return (
    <DashboardLayout>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-100 m-auto border border-1 rounded p-4 mt-4 overflow-auto">
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
          <br />

          <ImageUpload
            onDrop={onUpload}
            reject="Image/Video file less than 5mb"
            uploadImg="Upload Image/Videos"
            description="Drag'n'drop files here to upload. We can accept only img or video files that are less than 5mb in size."
            btn="Upload Image"
          />
          {current.imageUrl && (
            <div>
              <img
                src={current.imageUrl}
                alt="product"
                style={{ maxHeight: "100px" }}
              />
              <button
                className="btn btn-sm btn-danger"
                onClick={() => setCurrent({ ...current, imageUrl: "" })}
              >
                Delete
              </button>
            </div>
          )}
          <button className="w-100 btn btn-primary mt-4" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </Modal>
      <CustomTable data={allCategories} columns={columns} />
    </DashboardLayout>
  );
}

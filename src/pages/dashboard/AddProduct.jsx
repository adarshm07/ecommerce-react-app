import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/DashboardLayout";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  // useSelector to get the data from the store
  const token = useSelector((state) => state.user.token);

  // dispatch is used to push data to redux store
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const handleSubmit = () => {
    let data = JSON.stringify({
      title,
      description,
      price,
      categoryId,
      imageUrl,
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
        if (data.data.statusCode === 200) {
          toast.success("Product added successfully.");
        } else {
          toast.error("Error.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   if (user.loggedIn && window.location.pathname !== "/") {
  //     // we are using navigate to redirect to the home page because
  //     // redux without persistent storage will clear the data on page refresh.
  //     const redirectTimer = setTimeout(() => {
  //       // navigate("/");
  //     }, 200);

  //     return () => {
  //       clearTimeout(redirectTimer);
  //     };
  //   }
  // }, [navigate, user]);

  const onUpload = async (file) => {
    console.log(file);
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
        console.log(data);
        if (data.status) {
          setImageUrl(data?.data?.path);
        } else {
          toast.error("Error.");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <DashboardLayout>
      <div className="row">
        {/* <div className="col-12 col-md-3 col-lg-4"></div> */}
        <div className="col-12 col-md-6 col-lg-12">
          <div className="w-75 m-auto border border-1 rounded p-4 mt-4">
            <h1 className="fs-4">Add Product</h1>
            <input
              type="text"
              className="form-control mt-4"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control mt-3"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <select
              name="category"
              id="category"
              className="form-control mt-3"
              onChange={(e) => setCategoryId(e.target.value)}
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
            <span className="text-muted mt-3">{imageUrl}</span>
            <button
              className="w-100 btn btn-primary mt-4"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
        {/* <div className="col-12 col-md-3 col-lg-4"></div> */}
      </div>
    </DashboardLayout>
  );
}

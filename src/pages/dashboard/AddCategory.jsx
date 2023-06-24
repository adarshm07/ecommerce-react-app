import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../components/ImageUpload";
import axios from "axios";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // useSelector to get the data from the store
  const user = useSelector((state) => state.user);

  // dispatch is used to push data to redux store
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const handleLogin = async (e) => {
  //   // prevent default behavior - page refresh
  //   e.preventDefault();
  //   try {
  //     // adding headers
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     var raw = JSON.stringify({ email, password });

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //     };
  //     const response = await fetch(
  //       `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/auth/login`,
  //       requestOptions
  //     );
  //     const data = await response.json();
  //     // console.log(data.data.getUser);
  //     if (data.status === "success") {
  //       dispatch(
  //         setUser({
  //           firstName: data.data.getUser.firstName,
  //           lastName: data.data.getUser.lastName,
  //           email: data.data.getUser.email,
  //           token: data.data.getUser.token,
  //           loggedIn: true,
  //           role: data.data.getUser.role,
  //         })
  //       );
  //       // redirect to / using the react router
  //       // navigate("/");
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = (e) => {
    let data = JSON.stringify({
      title,
      description,
      imageUrl,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/category`,
      headers: {
        "x-token": "",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user.loggedIn && window.location.pathname !== "/") {
      // we are using navigate to redirect to the home page because
      // redux without persistent storage will clear the data on page refresh.
      const redirectTimer = setTimeout(() => {
        // navigate("/");
      }, 200);

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [navigate, user]);

  const onUpload = async (file) => {
    var formdata = new FormData();
    formdata.append("image", file[0], file[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        // setTestimonial({ ...testimonial, url: data.data.path });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-12 col-md-3 col-lg-4"></div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="w-75 m-auto border border-1 rounded p-4 mt-4">
            <h1 className="fs-4">Add Category</h1>
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

            {/* <ImageUpload
              onDrop={onUpload}
              reject="Image/Video file less than 5mb"
              uploadImg="Upload Image/Videos"
              description="Drag'n'drop files here to upload. We can accept only img or video files that are less than 5mb in size."
            /> */}
            <button
              className="w-100 btn btn-primary mt-4"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-4"></div>
      </div>
    </Layout>
  );
}

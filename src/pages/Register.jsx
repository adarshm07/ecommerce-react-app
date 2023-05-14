import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/user/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(user),
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Account registration successful.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-12 col-md-3 col-lg-4"></div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="w-75 m-auto border border-1 rounded p-4 mt-4">
            <h1 className="fs-4">Register</h1>
            <input
              type="text"
              class="form-control mt-4"
              placeholder="First Name"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <input
              type="text"
              class="form-control mt-4"
              placeholder="Last Name"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
            <input
              type="text"
              class="form-control mt-4"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              class="form-control mt-3"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button
              className="w-100 btn btn-primary mt-4"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

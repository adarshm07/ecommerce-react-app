import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useSelector to get the data from the store
  const user = useSelector((state) => state.user);

  // dispatch is used to push data to redux store
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  // handle login - example using javascript fetch web api.
  const handleLogin = async (e) => {
    // prevent default behavior - page refresh
    e.preventDefault();
    try {
      // adding headers
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ email, password });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/v1/user/login`,
        requestOptions
      );
      const data = await response.json();
      // console.log(data.data.getUser);
      if (data.status === "success") {
        dispatch(
          setUser({
            firstName: data.data.getUser.firstName,
            lastName: data.data.getUser.lastName,
            email: data.data.getUser.email,
            token: data.data.getUser.token,
            loggedIn: true,
          })
        );
        // redirect to / using the react router
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.loggedIn && window.location.pathname !== "/") {
      // we are using navigate to redirect to the home page because
      // redux without persistent storage will clear the data on page refresh.
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 200);

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [navigate, user]);

  return (
    <Layout>
      <div className="row">
        <div className="col-12 col-md-3 col-lg-4"></div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="w-75 m-auto border border-1 rounded p-4 mt-4">
            <h1 className="fs-4">Login</h1>
            <input
              type="text"
              className="form-control mt-4"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-100 btn btn-primary mt-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
        <div className="col-12 col-md-3 col-lg-4"></div>
      </div>
    </Layout>
  );
}

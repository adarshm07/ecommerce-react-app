import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/userSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  const menu = [
    {
      name: "Home",
      link: "/",
      visible: "all",
    },
    {
      name: "Login",
      link: "/login",
      visible: "NotLoggedIn",
    },
    {
      name: "Register",
      link: "/register",
      visible: "NotLoggedIn",
    },
    {
      name: "Add Blog",
      link: "/add-blog",
      visible: "loggedIn",
    },
    {
      name: "Category",
      link: "/category",
      visible: "loggedIn",
    },
    {
      name: "Logout",
      link: "/",
      visible: "loggedIn",
      onclick: () => dispatch(logout()),
    },
  ];
  return (
    <div className="header container-fluid bg-secondary d-flex justify-content-between align-items-center text-white">
      <div>
        <a href="/">
          <h2 className="fs-6 p-3 text-white">Blog App</h2>
        </a>
      </div>

      <div className="d-flex">
        {/* check if user is logged in or not, if logged in, show items where visible === "all" and visible === "loggedIn", and do not display items where visible === "NotLoggedIn", if not logged in, show items where visible === "all" and visible === "NotLoggedIn"   */}
        {menu
          .filter(
            (item) =>
              item.visible === "all" ||
              (item.visible === "loggedIn" && isLoggedIn) ||
              (item.visible === "NotLoggedIn" && !isLoggedIn)
          )
          .map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={item.onclick ? item.onclick : null}
            >
              <span className="nav-link fs-6 p-3 text-white">{item.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}

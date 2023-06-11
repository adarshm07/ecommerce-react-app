import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/userSlice";
import Search from "./Search";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const isAdmin = useSelector((state) => state.user.role === "ADMIN");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
      name: "Dashboard",
      link: "/dashboard",
      visible: "loggedIn",
    },
    {
      name: "Add Product",
      link: "/add-product",
      visible: "adminLoggedIn",
    },
    // {
    //   name: "Add Blog",
    //   link: "/add-blog",
    //   visible: "loggedIn",
    // },
    // {
    //   name: "Category",
    //   link: "/category",
    //   visible: "loggedIn",
    // },
    {
      name: "Logout",
      link: "/",
      visible: "loggedIn",
      onclick: () => dispatch(logout()),
    },
  ];
  return (
    <div className="header container-fluid bg-secondary d-flex justify-content-between align-items-center text-white">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div>
          <a href="/">
            <h2 className="fs-6 p-3 text-white">eshop</h2>
          </a>
        </div>
        <Search />
        <div className="d-flex">
          {/* check if user is logged in or not, if logged in, show items where visible === "all" and visible === "loggedIn", and do not display items where visible === "NotLoggedIn", if not logged in, show items where visible === "all" and visible === "NotLoggedIn"   */}
          {menu
            .filter(
              (item) =>
                item.visible === "all" ||
                (item.visible === "loggedIn" && isLoggedIn) ||
                (item.visible === "NotLoggedIn" && !isLoggedIn) ||
                (item.visible === "adminLoggedIn" && isAdmin && isLoggedIn)
            )
            .map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={item.onclick ? item.onclick : null}
              >
                <span className="nav-link fs-6 p-3 text-white">
                  {item.name}
                </span>
              </Link>
            ))}
          <Link to="/cart">
            <div
              className="nav-link fs-6 p-3 text-white border border-1 d-flex justify-content-center align-items-center m-auto"
              style={{ borderRadius: "50%", height: "40px", width: "40px" }}
            >
              {cart.cartItems.length}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

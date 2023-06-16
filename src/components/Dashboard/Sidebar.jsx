import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    visible: "all",
  },
  {
    id: 2,
    name: "Add Product",
    link: "/dashboard/add-product",
    visible: "adminLoggedIn",
  },
  {
    id: 3,
    name: "All Users",
    link: "/dashboard/all-users",
    visible: "adminLoggedIn",
  },
  {
    id: 4,
    name: "All Products",
    link: "/dashboard/all-products",
    visible: "adminLoggedIn",
  },
];

const Sidebar = () => {
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  const isAdmin = useSelector((state) => state.user.role === "ADMIN");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="sidebar">
      <ul>
        {sidebarLinks
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
              <span className="nav-link fs-6 p-3">{item.name}</span>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;

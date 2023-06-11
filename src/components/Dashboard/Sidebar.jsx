import React from "react";
import { Link } from "react-router-dom";

const sidebarLinks = [
  {
    id: 1,
    name: "Add Product",
    link: "/add-product",
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <Link to={"/dashboard/add-product"}>
          <li>Dashboard</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;

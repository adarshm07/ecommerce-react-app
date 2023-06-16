import { useState } from "react";
import axios from "axios";
import CustomTable from "../../components/CustomTable";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardLayout from "../../components/DashboardLayout";

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
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

  const columnHelper = createColumnHelper();

  let columns = [
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>description</span>,
    }),
    columnHelper.accessor("price", {
      header: () => "Mobile",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("categoryId.title", {
      header: () => "Category",
      cell: (info) => info.renderValue(),
    }),
  ];

  return (
    <DashboardLayout>
      <CustomTable data={allProducts} columns={columns} />
    </DashboardLayout>
  );
}

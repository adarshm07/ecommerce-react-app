import { useState } from "react";
import axios from "axios";
import CustomTable from "../../components/CustomTable";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardLayout from "../../components/DashboardLayout";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const token = useSelector((state) => state.user.token);
  const getAllUsers = async () => {
    const data = await axios.get(
      "http://localhost:8080/api/v1/auth/get/all/user",
      {
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    if (data?.data?.data) {
      setAllUsers(data.data.data);
    } else {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columnHelper = createColumnHelper();

  let columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("mobile", {
      header: () => "Mobile",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("role", {
      header: () => "Role",
      cell: (info) => info.renderValue(),
    }),
  ];

  return (
    <DashboardLayout>
      <CustomTable data={allUsers} columns={columns} />
    </DashboardLayout>
  );
}

import Sidebar from "./Dashboard/Sidebar";
import Layout from "./Layout";

export default function DashboardLayout({ children }) {
  return (
    <Layout>
      <div className="d-flex">
        <Sidebar />
        {children}
      </div>
    </Layout>
  );
}

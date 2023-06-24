import Sidebar from "./Dashboard/Sidebar";
import Layout from "./Layout";

export default function DashboardLayout({ children }) {
  return (
    <Layout isDashboard={true}>
      <div className="d-flex">
        <Sidebar />
        {children}
      </div>
    </Layout>
  );
}

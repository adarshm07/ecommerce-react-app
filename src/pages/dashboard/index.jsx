import Layout from "../../components/Layout";
import Sidebar from "../../components/Dashboard/Sidebar";
import Footer from "../../components/Dashboard/Footer";

export default function Dashboard() {
  return (
    <Layout>
      <div className="d-flex">
        <Sidebar />

        {/* Main Content */}
        <div className="main-content p-4" style={{ minHeight: "78vh" }}>
          <h2>Dashboard</h2>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </Layout>
  );
}

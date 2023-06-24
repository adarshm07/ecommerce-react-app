import Header from "../containers/Header";
import Footer from "./Footer";

export default function Layout({ children, isDashboard = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={isDashboard ? "container-fluid p-0" : "container"}>
        <div className="container-fluid flex flex-col w-full max-w-4xl mx-auto p-0">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

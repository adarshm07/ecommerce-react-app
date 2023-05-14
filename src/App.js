import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  // isLoggedIn value is in redux store, when user login, it is updated to true, and when user logout, it is updated to false.
  const isLoggedIn = useSelector((state) => state.user.loggedIn);

  // we are creating a component here, which will redirect user to login page if user is not logged in.
  // we are passing isLoggedIn value as a prop to the component.
  // if user is not logged in, then we will redirect user to login page.
  // if user is logged in, then we will show the component that we are passing as a prop.

  // if user is logged in, then we will show the component that we are passing as a prop.
  const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
      // we are using Navigate component to redirect user to login page.
      // replace property is used to redirect user to login page without refreshing the page.
      // we are using this component in our protected route component.
      // protected route component is used to protect routes that user should not access if he is not logged in.
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<SinglePost />} /> */}
        {/* <Route
          path="/add-blog"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Category />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;

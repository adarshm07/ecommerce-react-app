import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Avatar.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { logout } from "../../store/userSlice";
import { Link } from "react-router-dom";

export default function Avatar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Handle logout functionality here
    dispatch(logout());
  };

  const handleCartLink = () => {
    // Handle cart link functionality here
  };

  return (
    <>
      {user.token !== "" ? (
        <div
          className="avatar d-flex align-items-center gap-3"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            src="https://avatars.githubusercontent.com/u/8259588?v=4"
            alt="avatar"
            className="avatar__image"
          />
          <div className="d-flex flex-column">
            <h4 className="hello__user">Hello,</h4>
            <h4 className="avatar__name">
              {user.firstName} {user.lastName}
            </h4>
          </div>

          <MdKeyboardArrowDown color="#ffffff" size={20} />
          {showDropdown && (
            <div className="position-absolute d-flex flex-column dropdown">
              <button className="btn btn-link" onClick={handleCartLink}>
                Cart
              </button>
              <button className="btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to={"/login"}>
          <button className="btn btn-sm btn-primary" onClick={handleCartLink}>
            Login
          </button>
        </Link>
      )}
    </>
  );
}

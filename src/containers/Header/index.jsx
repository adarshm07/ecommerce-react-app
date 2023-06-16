import Avatar from "../../components/Avatar";
import Cart from "../../components/Cart";
import Logo from "../../components/Logo";
import SearchBar from "../SearchBar";
import "./Header.css";

export default function Header() {
  return (
    <div className="amazon__header">
      <div className="container-fluid d-flex justify-content-between align-items-center px-3 py-2">
        <Logo />
        <SearchBar />
        <Avatar />
        <Cart />
      </div>
    </div>
  );
}

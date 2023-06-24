import { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./Logo.css";
import { Link } from "react-router-dom";

export default function Logo() {
  const [imgUrl, setImgUrl] = useState(logo);

  return (
    <Link to={"/"}>
      <img src={imgUrl} alt={"logo"} className="amazon__logo" />
    </Link>
  );
}

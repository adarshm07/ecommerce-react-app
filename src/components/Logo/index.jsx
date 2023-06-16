import { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./Logo.css";

export default function Logo() {
  const [imgUrl, setImgUrl] = useState(logo);

  return <img src={imgUrl} alt={"logo"} className="amazon__logo" />;
}

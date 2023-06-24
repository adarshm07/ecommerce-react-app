import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs({ title }) {
  const router = useLocation();

  return (
    <div className="breadcrumbs my-3">
      <Link to={"/"}>Home</Link> / {router.pathname.split("/")[1]} /{" "}
      {title ? title : router.pathname.split("/")[2]}
    </div>
  );
}

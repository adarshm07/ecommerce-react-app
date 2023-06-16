import { useSelector } from "react-redux";
import "./Avatar.css";

export default function Avatar() {
  const user = useSelector((state) => state.user);
  // console.log(user);
  return (
    <div className="avatar d-flex gap-3">
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
    </div>
  );
}

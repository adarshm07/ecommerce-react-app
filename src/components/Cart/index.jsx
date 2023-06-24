import { HiOutlineShoppingCart } from "react-icons/hi";
import "./Cart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartValue = useSelector((state) => state.cart.cartItems);
  return (
    <div className="cart__header">
      <div className="cart__count">{!cartValue ? 0 : cartValue.length}</div>
      <Link to={"/cart"}>
        <HiOutlineShoppingCart color="#ffffff" size={26} />
      </Link>
    </div>
  );
}

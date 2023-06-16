import { HiOutlineShoppingCart } from "react-icons/hi";
import "./Cart.css";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartValue = useSelector((state) => state.cart.cartItems);
  return (
    <div className="cart__header">
      <div className="cart__count">{!cartValue ? 0 : cartValue.length}</div>
      <HiOutlineShoppingCart color="#ffffff" size={26} />
    </div>
  );
}

import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Cart() {
  const productsInCart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const getAllItems = async () => {
    const data = await axios.get("http://localhost:8080/api/v1/cart", {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    });
    console.log(data.data.data);
  };

  const handleChangeQuantity = async (product, action) => {
    let config = {
      method: "post",
      url: `http://localhost:8080/api/v1/cart/qty/${action}`,
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ productId: product.id }),
    };

    await axios.request(config).then((response) => {
      if (response.data.statusCode === 201) {
        if (action === "inc") {
          dispatch(addToCart(product));
        } else if (action === "dec") {
          dispatch(removeFromCart(product));
        }
      } else {
        toast.error("Something went wrong");
      }
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Layout>
      <div className="d-flex flex-column gap-2">
        {productsInCart.cartItems &&
          productsInCart.cartItems.map((product) => {
            return (
              <div
                key={product._id}
                className="product-in-cart d-flex justify-content-between border border-1 p-2 m-1 w-50"
              >
                <div>Title: {product.title}</div>
                <div>Price: {product.price}</div>
                <div>
                  Quantity:
                  <button onClick={() => handleChangeQuantity(product, "dec")}>
                    -
                  </button>
                  {product.quantity}
                  <button onClick={() => handleChangeQuantity(product, "inc")}>
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleChangeQuantity(product, "dec")}
                >
                  Remove
                </button>
              </div>
            );
          })}
        <button className="btn btn-primary">Checkout</button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>

        {!productsInCart && (
          <div>
            <div>Your cart is empty</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
